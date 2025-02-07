import express from 'express';
import { addFAQ, listFAQs } from '../controllers/faqController.js';

const router = express.Router();

router.post('/faq', addFAQ);
router.get('/faq', listFAQs);

export default router;
