import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { createOrder1, verifyPayment1 } from '../controllers/paymentControllerUser.js';

const router = express.Router();

// Route to create an order
router.post('/create-order', createOrder);

// Route to verify the payment
router.post('/verify-payment', verifyPayment);
// Route to create an order
router.post('/create-order1', createOrder1);

// Route to verify the payment
router.post('/verify-payment1', verifyPayment1);
export default router;
