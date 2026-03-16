import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Routes from './routes/Routes.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.BD_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/',Routes);
// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
