const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadCab } = require('../Controllers/CabController');

const router = express.Router();

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/Cab/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// POST: Upload cab
router.post('/upload', upload.single('cabImage'), uploadCab);

module.exports = router;
