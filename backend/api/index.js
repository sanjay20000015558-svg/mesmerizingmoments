const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
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
app.use("/api/contact", require("../routes/contact"));
app.use("/api/gallery", require("../routes/gallery"));
app.use("/api/testimonials", require("../routes/testimonials"));

/* ======================
   Health Check
====================== */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "M² Backend running on Vercel",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

/* ======================
   EXPORT (NO app.listen)
====================== */
module.exports = app;
