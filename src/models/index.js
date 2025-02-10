import sequelize from '../db/index.js';
import User from './user.js';

// Sync all models with the database
const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    await sequelize.sync({ alter: true }); // Sync models
    console.log('✅ All models synchronized.');

  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
};

export { sequelize, User, initDB };
