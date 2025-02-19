const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const { user, token } = req.user;
  res.json({ user, token });  // Send back user data along with the token
});


module.exports = router;
