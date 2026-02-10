const express = require('express');
const router = express.Router();
const multer = require('multer');
const Gallery = require('../models/Gallery');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const gallery = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new gallery item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const galleryItem = new Gallery({
      title: req.body.title,
      category: req.body.category,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl,
      description: req.body.description
    });
    await galleryItem.save();
    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
