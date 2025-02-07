import express from 'express';
import sequelize from "../src/db/index.js";
import userRoutes from './routes/userRoutes.js';
import faqRoutes from './routes/faqRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/faqs', faqRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('🚀 Server running on port 5000');
  });
});
