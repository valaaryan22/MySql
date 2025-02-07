import FAQ from "../models/faq.js";
import FAQCategory from "../models/faqCategory.js";

export const addFAQ = async (req, res) => {
  try {
    const { cat_id, question, answer } = req.body;
    const faq = await FAQ.create({ cat_id, question, answer });

    res.status(201).json({ message: "FAQ added successfully", faq });
  } catch (error) {
    console.error("Error adding FAQ:", error); // Debugging
    res.status(500).json({ message: "Error adding FAQ", error: error.message });
  }
};

export const listFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.findAll({
      include: {
        model: FAQCategory,
        as: "category", // Ensure the alias matches the association
        attributes: ["faq_cat_name"], // Include category name
      },
    });

    res.status(200).json({ message: "FAQs listed successfully", faqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error); // Debugging
    res.status(500).json({ message: "Error fetching FAQs", error: error.message });
  }
};
