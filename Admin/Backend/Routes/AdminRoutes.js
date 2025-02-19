const express = require('express');
const { adminSignup, adminLogin } = require('../Controllers/AdminController');
const authMiddleware = require('../Middleware/AdminMiddleware'); // Importing middleware
const router = express.Router();

// Admin Signup Route
router.post('/signup', adminSignup);

// Admin Login Route with Authorization Middleware
router.post('/login', adminLogin);

// Protected Route example (using authMiddleware)
router.get('/AdminDashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard!' });
});

module.exports = router;
