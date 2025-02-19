const mongoose = require('mongoose');

// Cab Schema
const cabSchema = new mongoose.Schema({
  cabId: {
    type: String,
    required: true,
    unique: true, // Ensure that cabId is unique
  },
  cabNumber: {
    type: String,
    required: true,
  },
  cabModel: {
    type: String,
    required: true,
  },
  cabDriver: {
    type: String,
    required: true,
  },
  cabDriverNumber: {
    type: String,
    required: true,
  },
  cabPrice: {
    type: Number,
    required: true,
  },
  cabStatus: {
    type: String,
    required: true,
  },
  cabImage: {
    type: String, // Store the image filename in the database
    required: false,
  },
});

// Create a model for the Cab
const Cab = mongoose.model('Cab', cabSchema);

module.exports = Cab;
