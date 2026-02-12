const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ======================
   Middleware
====================== */
// Allow all origins for development and production
app.use(cors());
app.use(express.json());

/* ======================
   MongoDB Connection
====================== */
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("🚀 MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err.message));
} else {
  console.log("⚠️ MONGODB_URI not set in .env file");
}

/* ======================
   Routes
====================== */
// Routes with /api prefix to match frontend calls
app.use("/api/contact", require("../routes/contact"));
app.use("/api/gallery", require("../routes/gallery"));
app.use("/api/testimonials", require("../routes/testimonials"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "M² Backend running on Vercel",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Debug route to test API connectivity
app.get("/api/test", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "API is working",
    timestamp: new Date().toISOString() 
  });
});

// Catch-all for unmatched routes
app.use((req, res) => {
  console.log('Unhandled route:', req.method, req.url);
  res.status(404).json({ 
    error: 'Route not found', 
    path: req.url,
    method: req.method 
  });
});

/* ======================
   EXPORT (NO app.listen)
====================== */
module.exports = app;
