const express = require('express');
const router = express.Router();
const { getAdminProfile, updateAdminProfile } = require('../Controllers/ProfileController'); // Ensure this is destructured correctly

// Route to get admin profile
router.get('/get-profile', getAdminProfile);

// Route to update admin profile
router.put('/update-profile', updateAdminProfile);

module.exports = router;
