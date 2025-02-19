const mongoose = require('mongoose');

// Define the schema for the Housekeeping Service
const housekeepingServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
}, {
  timestamps: true, 
});

// Create a model based on the schema
const HousekeepingService = mongoose.model('HousekeepingService', housekeepingServiceSchema);

module.exports = HousekeepingService;
