const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  roomPrice: {
    type: Number,
    required: true,
  },
  roomDescription: {
    type: String,
    required: true,
  },
  roomStatus: {
    type: String,
    required: true,
  },
  roomImage: {
    type: String,  // Store the image filename in the database
    required: false,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
