import FAQ from '../models/faq.js';
import FAQCategory from '../models/faqCategory.js';

export const addFAQ = async (req, res) => {
  try {
    const { cat_id, question, answer } = req.body;
    const faq = await FAQ.create({ cat_id, question, answer });

    res.status(201).json({ message: 'FAQ added successfully', faq });
  } catch (error) {
    res.status(500).json({ message: 'Error adding FAQ', error });
  }
};

export const listFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.findAll({ include: FAQCategory });
    res.status(200).json({ message: 'FAQs listed successfully', faqs });
    res.json({ faqs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs', error });
  }
};
