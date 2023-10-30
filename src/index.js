import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'; // Body parsing middleware

import userRoutes from './routes/userRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import memberRoutes from './routes/memberRoutes.js';

dotenv.config();

const app = express();

// Middleware: Enable CORS
app.use(cors());

// Middleware: JSON parsing
app.use(express.json());

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Use API routes
app.use('/', userRoutes);
app.use('/', communityRoutes);
app.use('/', roleRoutes);
app.use('/', memberRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
