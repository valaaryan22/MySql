import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import User from '../models/user.js';
import nodemailer from 'nodemailer';

dotenv.config();

// Initialize Razorpay instance with proper error handling
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,      // Move to .env
  key_secret: process.env.KEY_SECRET,   // Move to .env
});

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send payment email to user
export const sendPaymentEmail = async (userEmail, amount, orderId) => {
  const paymentLink = `${process.env.FRONTEND_URL}/payment/${orderId}/${amount}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Payment Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Payment Request</h2>
        <p>Amount to be paid: ₹${amount}</p>
        <p>Order ID: ${orderId}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${paymentLink}" 
            style="background-color: #4CAF50; color: white; padding: 14px 25px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Pay Now
          </a>
        </div>
        <p>Click the button above to complete your payment.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Payment email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending payment email:', error);
    return false;
  }
};

// Controller to create Razorpay order
export const createOrder = async (req, res) => {
  try {
    const { amount, userEmail } = req.body;

    // Validate inputs
    if (!amount || !userEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: { amount, userEmail } 
      });
    }

    // Verify user exists
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create unique receipt ID
    const receiptId = `rcpt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create order options
    const options = {
      amount: Math.round(amount * 100), // Convert to paise and ensure it's an integer
      currency: 'INR',
      receipt: receiptId,
      payment_capture: 1,
      notes: {
        userEmail: userEmail // Store user email in notes for reference
      }
    };

    console.log('Creating order with options:', options);

    const order = await razorpay.orders.create(options);
    
    console.log('Order created successfully:', order);

    // Send payment email to the user
    const emailSent = await sendPaymentEmail(userEmail, amount, order.id);

    if (emailSent) {
      console.log('Payment email sent successfully');
    } else {
      console.error('Failed to send payment email');
    }

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    console.error('Detailed error in order creation:', error);
    res.status(500).json({
      error: 'Error creating order',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Controller to verify payment
export const verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature, userEmail } = req.body;

  console.log('Verifying payment:', { paymentId, orderId, signature, userEmail });

  if (!paymentId || !orderId || !signature || !userEmail) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      details: { paymentId, orderId, signature, userEmail }
    });
  }

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    console.log('Payment details:', payment);

    if (payment.order_id === orderId && payment.status === 'captured') {
      // Update user payment status
      await User.update(
        {
          payment_status: true,
          payment_amount: payment.amount / 100,
          payment_date: new Date()
        },
        {
          where: { email: userEmail }
        }
      );
    
      return res.json({ success: true, payment: payment });
    } else {
      return res.json({ 
        success: false,
        reason: 'Payment verification failed',
        details: {
          status: payment.status,
          orderId: payment.order_id,
          expectedOrderId: orderId
        }
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ 
      error: 'Error verifying payment',
      details: error.message
    });
  }
};
