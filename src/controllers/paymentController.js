import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_kWbuztJHjjMxDu",
  key_secret: process.env.KEY_SECRET,  // Correct secret key from .env
});

// Controller to create Razorpay order
export const createOrder = async (req, res) => {
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
};export const verifyPayment = async (req, res) => {
    const { paymentId, orderId, signature } = req.body;
  
    console.log('Received Data:', { paymentId, orderId, signature });
  
    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({ error: 'Missing paymentId, orderId, or signature' });
    }
  
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      if (payment.order_id === orderId && payment.status === 'captured') {
        console.log('Payment successfully verified!');
        return res.json({ success: true });
      } else {
        console.error('Payment verification failed: Invalid payment status or mismatched order_id');
        return res.json({ success: false });
      }
    } catch (error) {
      console.error('Error fetching payment from Razorpay:', error);
      return res.status(500).json({ error: 'Error verifying payment' });
    }
  };
  