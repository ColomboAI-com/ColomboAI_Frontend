// File: perplexica/backend/src/routes/messages.ts

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for file uploads
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Set the filename to be unique using the current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create multer middleware with the configured storage
const upload = multer({ storage: storage });

// Define the route for handling message posts and file uploads
router.post('/messages', upload.array('files'), (req, res) => {
  const message = req.body.message;
  const chatId = req.body.chatId;
  const files = req.files as Express.Multer.File[];

  // Here you would typically save the message to your database
  // For this example, we'll just log it and return a response

  // Create metadata for uploaded files
  const fileMetadata = files.map(file => ({
    name: file.originalname,
    path: file.path,
    type: file.mimetype
  }));

  console.log('Received message:', message);
  console.log('For chat:', chatId);
  console.log('With files:', fileMetadata);

  // In a real application, you'd save this information to your database
  // and possibly process the files (e.g., virus scan, generate thumbnails, etc.)

  // Send a response back to the client
  res.json({
    success: true,
    message: 'Message received',
    files: fileMetadata
  });
});

export default router;