const Room = require('../Models/RoomModel'); // Import Room model

// Controller to handle room upload
const uploadRoom = async (req, res) => {
  const { roomNumber, roomType, roomPrice, roomDescription, roomStatus } = req.body;
  const roomImage = req.file ? req.file.filename : null;

  // Create a new room entry
  const newRoom = new Room({
    roomNumber,
    roomType,
    roomPrice,
    roomDescription,
    roomStatus,
    roomImage,
  });

  try {
    // Save the room to the database
    await newRoom.save();
    console.log('Room added to database:', newRoom);
    res.send('Room and image uploaded successfully!');
  } catch (error) {
    console.log('Error saving room to database:', error);
    res.status(500).send('Failed to upload room and image.');
  }
};

module.exports = {
  uploadRoom,
};
