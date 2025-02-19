const express = require('express');
const multer = require('multer');
const path = require('path');
const roomController = require('../Controllers/RoomController'); // Import room controller

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/Room/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

const router = express.Router();

// POST route to handle room upload
router.post('/', upload.single('roomImage'), roomController.uploadRoom);

module.exports = router;
