const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// API Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/testimonials', require('./routes/testimonials'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'M² Backend is running' });
});

// Export for Vercel
module.exports = app;
