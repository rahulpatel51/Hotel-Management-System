const WeddingHall = require('../Models/WeddingHallModel'); // Import WeddingHall model

// Get all wedding halls
const getAllWeddingHalls = async (req, res) => {
    try {
        const weddingHalls = await WeddingHall.find();
        const weddingHallsWithImageUrls = weddingHalls.map(hall => ({
            ...hall.toObject(),
            imageUrl: hall.hallImage ? `/uploads/WeddingHall/${hall.hallImage}` : null, // Build the correct image URL
        }));
        res.json(weddingHallsWithImageUrls);
    } catch (error) {
        console.error('Error fetching wedding halls:', error);
        res.status(500).json({ message: 'Error fetching wedding halls' });
    }
};

module.exports = {
    getAllWeddingHalls,
};
