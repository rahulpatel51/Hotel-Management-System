const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // Ensure jwt is imported

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        // Password is only required if Google ID is not provided
        return !this.googleId;
      },
    },
    userType: {
      type: String,
      default: 'user',
    },
    mobileNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    dob: {
      type: Date,
    },
    profilePicture: {
      type: String,
    },
    googleId: { // New field for Google login
      type: String,
      unique: true,
    },
  },
  { timestamps: true }  // Adds createdAt and updatedAt
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate Auth Token
UserSchema.methods.generateAuthToken = function() {
  const payload = { userId: this._id };  // You can include more information here
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Compare entered password with hashed password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
