const express = require('express');
const { signupUser, loginUser } = require('../Controllers/UserController');
const UserMiddleware = require('../Middleware/UserMiddleware');

const router = express.Router();

// Signup Route
router.post('/signup', signupUser);

// Login Route
router.post('/login', loginUser);

// Protected Route (Example)
router.get('../../Frontend/UserDashboard.html', UserMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the dashboard', user: req.user });
});


module.exports = router;
