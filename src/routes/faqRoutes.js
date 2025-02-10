import express from 'express';
import { addFAQ, deleteFaq, listFAQs, updateFaq } from '../controllers/faqController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/faq', addFAQ);
router.get('/faq', listFAQs);
router.post('/delete', deleteFaq);
router.put('/updatefaq', updateFaq);

export default router;
