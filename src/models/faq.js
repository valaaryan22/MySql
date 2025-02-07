import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../db/index.js";
import FAQCategory from './faqCategory.js';

const FAQ = sequelize.define('FAQ', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FAQCategory,
      key: 'cat_id',
    },
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'faqs',
  timestamps: false,
});

export default FAQ;
