import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import User from '../models/user.js'; // Your User model

dotenv.config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,  // Correct secret key from .env
});

// Controller to create Razorpay order
export const createOrder1 = async (req, res) => {
  try {
    const { amount } = req.body;  // Amount should be in smallest unit (like paise)
    const options = {
      amount: amount * 100,  // Convert to paise
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Error creating order');
  }
};

// Controller to verify Razorpay payment and update user data
export const verifyPayment1 = async (req, res) => {
  const { paymentId, orderId, signature, userEmail } = req.body;

  console.log('Received Data:', { paymentId, orderId, signature, userEmail });

  if (!paymentId || !orderId || !signature || !userEmail) {
    return res.status(400).json({ error: 'Missing paymentId, orderId, signature or userEmail' });
  }

  try {
    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(paymentId);
    if (payment.order_id === orderId && payment.status === 'captured') {
      console.log('Payment successfully verified!');

      // Find the user by email instead of using JWT
      const user = await User.findOne({ where: { email: userEmail } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user's payment details in the database
      user.payment_status = true;
      user.payment_amount = payment.amount / 100;  // Convert back to INR from paise
      user.payment_date = new Date();  // Set the current date and time
      await user.save();

      return res.json({ success: true, message: 'Payment verified and user updated' });
    } else {
      console.error('Payment verification failed: Invalid payment status or mismatched order_id');
      return res.json({ success: false });
    }
  } catch (error) {
    console.error('Error fetching payment from Razorpay:', error);
    return res.status(500).json({ error: 'Error verifying payment' });
  }
};
