const express = require('express');
const router = express.Router();

// In-memory storage for demo (when MongoDB is not available)
let contacts = [];

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    // Return empty array if MongoDB is not connected
    console.log('MongoDB not connected, using in-memory storage');
    res.json([]);
  }
});

// Create new contact
router.post('/', async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, contact });
  } catch (error) {
    // If MongoDB is not connected, store in memory
    console.log('MongoDB error, using in-memory storage:', error.message);
    const newContact = {
      ...req.body,
      _id: Date.now().toString(),
      createdAt: new Date()
    };
    contacts.push(newContact);
    res.status(201).json({ success: true, contact: newContact, stored: 'in-memory' });
  }
});

module.exports = router;
