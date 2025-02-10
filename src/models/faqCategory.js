import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../db/index.js";

const FAQCategory = sequelize.define('FAQCategory', {
  cat_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  faq_cat_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'faq_categories',
  timestamps: true,
});

export default FAQCategory;
