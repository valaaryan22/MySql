import { Sequelize } from 'sequelize';  // Add this import to your controller file
import FAQ from "../models/faq.js";
import FAQCategory from "../models/faqCategory.js";

// Controller for adding an FAQ
export const addFAQ = async (req, res) => {
  try {
    const { cat_id, question, answer } = req.body;

    // Check if the category exists
    const category = await FAQCategory.findOne({ where: { cat_id } });

    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    // If the category exists, create the FAQ
    const faq = await FAQ.create({ cat_id, question, answer });

    res.status(201).json({ message: "FAQ added successfully", faq });
  } catch (error) {
    console.error("Error adding FAQ:", error); // Debugging
    res.status(500).json({ message: "Error adding FAQ", error: error.message });
  }
};

// Controller for listing FAQs with search and pagination
export const listFAQs = async (req, res) => {
  try {
    // Extract query parameters for pagination and search
    const { page = 1, limit = 10, search = "" } = req.query;

    const offset = (page - 1) * limit;

    const faqs = await FAQ.findAndCountAll({
      where: {
        question: {
          [Sequelize.Op.like]: `%${search}%`, // Search in question
        },
      },
      include: {
        model: FAQCategory,
        as: "category", // Ensure the alias matches the association
        attributes: ["faq_cat_name"], // Include category name
      },
      limit: Number(limit),
      offset: Number(offset),
    });

    const totalPages = Math.ceil(faqs.count / limit);

    res.status(200).json({
      message: "FAQs listed successfully",
      faqs: faqs.rows,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalFAQs: faqs.count,
        limit: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error); // Debugging
    res.status(500).json({ message: "Error fetching FAQs", error: error.message });
  }
};

// Controller for deleting an FAQ
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.body; // Get id from request body

    // Check if FAQ exists
    const faq = await FAQ.findOne({ where: { id } });
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Delete FAQ
    await faq.destroy();

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ", error });
  }
};

// Controller for updating an FAQ
export const updateFaq = async (req, res) => {
  try {
    const { id, cat_id, question, answer } = req.body;

    // Check if FAQ exists
    const faq = await FAQ.findOne({ where: { id } });
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Update FAQ details if provided
    if (cat_id) faq.cat_id = cat_id;
    if (question) faq.question = question;
    if (answer) faq.answer = answer;

    await faq.save(); // Save updated FAQ

    res.status(200).json({ message: "FAQ updated successfully", faq });
  } catch (error) {
    res.status(500).json({ message: "Error updating FAQ", error });
  }
};
