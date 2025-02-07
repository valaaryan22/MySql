import express from 'express';
import { addFAQ, listFAQs } from '../controllers/faqController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/faq',authenticateUser, addFAQ);
router.get('/faq', listFAQs);

export default router;
