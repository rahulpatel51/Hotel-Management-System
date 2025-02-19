const passport = require('passport');
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

// Google login callback
exports.googleLogin = async (req, res) => {
  const { googleId, email, name } = req.user;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        googleId,
        email,
        fullName: name,
      });
      await user.save();
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token in response
    res.json({
      token,
      message: 'User logged in successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
