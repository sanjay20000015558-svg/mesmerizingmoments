const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* ======================
   Middleware
====================== */
const allowedOrigins = [
  "http://localhost:3000",
  "https://mesmerizingmoments.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

/* ======================
   MongoDB Connection
====================== */
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

/* ======================
   API Routes
====================== */
app.use('/api/contact', require('./routes/contact'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/testimonials', require('./routes/testimonials'));

/* ======================
   Health Check
====================== */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'M² Backend is running'
  });
});

/* ======================
   START SERVER (REQUIRED)
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 M² Backend running on port ${PORT}`);
});
