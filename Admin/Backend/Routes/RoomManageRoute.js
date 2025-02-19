const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  editRoom,
  deleteRoom,
} = require('../Controllers/RoomManageController');

// Routes for managing rooms
router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.put('/:id', editRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
