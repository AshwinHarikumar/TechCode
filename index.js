const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Document = require('./models/Document');

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
require('./connection'); // Ensure this file properly sets up the connection

// Add drive links
// index.js or app.js

// Endpoint to add documents with image
app.post('/api/documents/add-google-drive-link', async (req, res) => {
    try {
      const { title, description, googleDriveLink, image } = req.body;
  
      if (!title || !googleDriveLink || !image) {
        return res.status(400).json({ message: 'Title, Google Drive link, and image are required' });
      }
  
      const newDocument = new Document({
        title,
        description,
        googleDriveLink,
        image
      });
  
      await newDocument.save();
      res.status(201).json(newDocument);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Get all documents
app.get('/api/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get a document by ID


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
