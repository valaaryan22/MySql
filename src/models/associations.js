import FAQ from './faq.js';
import FAQCategory from './faqCategory.js';

// Set associations after models are defined
FAQ.belongsTo(FAQCategory, { foreignKey: 'cat_id', as: 'category' });
FAQCategory.hasMany(FAQ, { foreignKey: 'cat_id', as: 'faqs' });
