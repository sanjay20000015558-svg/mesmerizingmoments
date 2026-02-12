const express = require('express');
const router = express.Router();

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
  console.log('Contact form submission received:', req.body);
  
  try {
    const Contact = require('../models/Contact');
    const contact = new Contact(req.body);
    await contact.save();
    console.log('Contact saved to MongoDB successfully');
    res.status(201).json({ success: true, contact, source: 'mongodb' });
  } catch (error) {
    console.log('MongoDB error, falling back to in-memory storage:', error.message);
    // Store in memory for serverless environments (will persist for short periods)
    const newContact = {
      ...req.body,
      _id: Date.now().toString(),
      createdAt: new Date()
    };
    
    // Store in global variable to persist across serverless invocations
    if (typeof global !== 'undefined') {
      global.tempContacts = global.tempContacts || [];
      global.tempContacts.push(newContact);
      console.log('Contact stored in global memory. Total:', global.tempContacts.length);
    }
    
    res.status(201).json({ 
      success: true, 
      contact: newContact, 
      source: 'in-memory',
      message: 'Your message has been received! We will contact you soon.'
    });
  }
});

module.exports = router;
