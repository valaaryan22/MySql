
import FAQCategory from '../models/faqCategory.js';
import FAQ from '../models/faq.js';

// Define relationships AFTER both models are imported
FAQCategory.hasMany(FAQ, { foreignKey: 'cat_id', as: 'faqs' });
FAQ.belongsTo(FAQCategory, { foreignKey: 'cat_id', as: 'category' });

export default { FAQ, FAQCategory };
