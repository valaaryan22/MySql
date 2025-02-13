import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.js';
// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_kWbuztJHjjMxDu",
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
export const verifyPayment1 = async (req, res) => {
    const { paymentId, orderId, signature } = req.body;
  
    console.log('Received Data:', { paymentId, orderId, signature });
  
    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({ error: 'Missing paymentId, orderId, or signature' });
    }
  
    try {
      // Fetch payment details from Razorpay
      const payment = await razorpay.payments.fetch(paymentId);
      if (payment.order_id === orderId && payment.status === 'captured') {
        console.log('Payment successfully verified!');
  
        // Get the current user from the JWT token (assuming token is in cookies)
        const token = req.cookies.token;
        if (!token) {
          return res.status(401).json({ error: 'No token provided' });
        }
  
        // Decode token to get the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
  
        // Find the user in the database
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Update user payment status, amount, and payment date
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