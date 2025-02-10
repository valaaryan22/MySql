import FAQ from "../models/faq.js";
import FAQCategory from "../models/faqCategory.js";
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
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.body; // Get email from request body

    // Check if user exists
    const faq = await FAQ.findOne({ where: { id } });
    if (!faq) {
      return res.status(404).json({ message: "faq not found" });
    }

    // Delete user
    await faq.destroy();

    res.status(200).json({ message: "faq deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting faq", error });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const { cat_id, question, answer } = req.body;

    // Check if user exists
    const user = await FAQ.findOne({ where: { cat_id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details if provided
    if (question) user.question = question;
    if (answer) user.answer = answer;

    // Hash and update password if provided
  

    await user.save(); // Save updated data

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};