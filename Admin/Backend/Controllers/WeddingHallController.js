const WeddingHall = require('../Models/WeddingHallModel');
const multer = require('multer');
const path = require('path');

// Set up storage engine for Multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/WeddingHall/'); // File will be uploaded to "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp
    }
});

const upload = multer({ storage: storage });

const addWeddingHall = async (req, res) => {
    const { hallNumber, hallName, hallCapacity, hallPrice, hallLocation, hallStatus, hallType, hallDescription } = req.body;
    const hallImage = req.file ? req.file.filename : null; // Handle image upload

    // Create a new Wedding Hall document
    const newWeddingHall = new WeddingHall({
        hallNumber,
        hallName,
        hallCapacity,
        hallPrice,
        hallLocation,
        hallStatus,
        hallImage,
        hallType,
        hallDescription
    });

    try {
        // Save the wedding hall to the database
        await newWeddingHall.save();
        res.send('Wedding Hall added successfully!');
    } catch (error) {
        console.error('Error saving Wedding Hall:', error);
        res.status(500).send('Failed to add Wedding Hall.');
    }
};

module.exports = {
    addWeddingHall,
    upload
};
