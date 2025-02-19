const express = require('express');
const router = express.Router();
const cabController = require('../Controllers/CabManageController');

// Get all cabs
router.get('/cabs', cabController.getAllCabs);

// Get a single cab by ID
router.get('/cabs/:id', cabController.getCabById);

// Update a cab
router.put('/cabs/:id', cabController.updateCab);

// Delete a cab
router.delete('/cabs/:id', cabController.deleteCab);

module.exports = router;
