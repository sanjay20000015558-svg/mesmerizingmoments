const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* ======================
   Middleware
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   MongoDB Connection
====================== */
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// Only attempt connection if URI is provided
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('🚀 MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err.message));
} else {
  console.log('⚠️ MONGODB_URI not set in .env file');
}

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
    message: 'M² Backend is running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 M² Backend running on port ${PORT}`);
});
