const mongoose = require('mongoose');

// Define the schema for the Housekeeping Request
const housekeepingRequestSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  specialRequest: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create a model based on the schema
const HousekeepingRequest = mongoose.model('HousekeepingRequest', housekeepingRequestSchema);

module.exports = HousekeepingRequest;
