import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../db/index.js";

// Define FAQ model without association
const FAQ = sequelize.define('FAQ', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  timestamps: true,
});

export default FAQ;
