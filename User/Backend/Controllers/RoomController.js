const Room = require('../Models/RoomModel');

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        const roomsWithImageUrls = rooms.map(room => ({
            ...room.toObject(),
            imageUrl: `/uploads/Room/${room.roomImage}`, // Serve the image with the correct path
        }));
        res.json(roomsWithImageUrls);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rooms', error });
    }
};

module.exports = { getRooms };
