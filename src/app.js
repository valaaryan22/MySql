import express from 'express';
import sequelize from "./db/index.js";
import userRoutes from './routes/userRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger.config.js';
import './models/associations.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

// CORS options to allow only http://localhost:5173
const corsOptions = {
  origin: process.env.ORIGIN, // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can customize the allowed HTTP methods
  credentials: true,  // Allow credentials such as cookies
};

app.use(cors(corsOptions));  // Use the cors options here

// Middleware
app.use(express.json());
app.use(cookieParser());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api/payment', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', faqRoutes); // Changed to /api/faq to match your FAQ routes

// Catch-all route for non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('🚀 Server running on port 5000');
  });
});
