const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ======================
   Middleware
====================== */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mesmerizingmoments-r5hp.vercel.app"
  ]
}));
app.use(express.json());

/* ======================
   MongoDB Connection
====================== */
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));
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
    message: "M² Backend running on Vercel"
  });
});

/* ======================
   EXPORT (NO app.listen)
====================== */
module.exports = app;
