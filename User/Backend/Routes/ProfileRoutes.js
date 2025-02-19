const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../Controllers/ProfileController');
const UserMiddleware = require('../Middleware/UserMiddleware');

// Route to get user profile (GET request)
router.get('/profile', UserMiddleware, getUserProfile);

// Route to update user profile (PUT request)
router.put('/profile', UserMiddleware, updateUserProfile);

module.exports = router;
