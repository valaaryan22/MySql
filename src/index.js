import express from 'express';
import sequelize from "../src/db/index.js";
import userRoutes from './routes/userRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import cors from "cors"
// import associations from './utils/associations.js';
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger.config.js';
import './models/associations.js'
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',  // Replace with your frontend's URL
  credentials: true,  // Allow credentials (cookies, etc.)
};
app.use(cors(corsOptions));
// Middleware
app.use(express.json());
app.use(cookieParser());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/users', faqRoutes); // Changed to /api/faq to match your FAQ routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('🚀 Server running on port 5000');
  });
});