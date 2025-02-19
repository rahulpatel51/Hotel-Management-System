const express = require('express');
const router = express.Router();
const { addWeddingHall, upload } = require('../Controllers/WeddingHallController');

// POST route for adding wedding hall
router.post('/addWeddingHall', upload.single('hallImage'), addWeddingHall);

module.exports = router;
