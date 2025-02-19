const express = require('express');
const router = express.Router();
const { getAllWeddingHalls } = require('../Controllers/WeddingHallController'); // Import controller functions

// Route to get all wedding halls
router.get('/', getAllWeddingHalls);

module.exports = router;
