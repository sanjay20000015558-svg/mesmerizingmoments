const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  eventType: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
