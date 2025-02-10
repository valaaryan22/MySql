import express from 'express';
import sequelize from "../src/db/index.js";
import userRoutes from './routes/userRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
// import associations from './utils/associations.js';
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger.config.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/users', faqRoutes); // Changed to /api/faq to match your FAQ routes

// Start server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('🚀 Server running on port 5000');
  });
});