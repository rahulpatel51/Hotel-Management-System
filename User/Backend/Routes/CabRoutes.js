// Backend/Routes/CabRoutes.js
const express = require('express');
const router = express.Router();
const CabController = require('../Controllers/CabController');

// Route to fetch all cabs
router.get('/cabs', CabController.getCabs);

// You can add more routes for actions like adding or deleting cabs

module.exports = router;
