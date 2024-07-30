const mongoose = require('mongoose');

// models/Document.js

const documentSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    googleDriveLink: {
      type: String,
      required: true
    },
    image: {
      type: String // URL of the image
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Document = mongoose.model('Document', documentSchema);
  
  module.exports = Document;
  
