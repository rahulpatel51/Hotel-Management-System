const express = require('express');
const { getRooms } = require('../Controllers/RoomController');

const router = express.Router();

// Route to fetch all rooms
router.get('/', getRooms);

module.exports = router;
