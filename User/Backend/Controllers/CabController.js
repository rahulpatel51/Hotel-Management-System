// Backend/Controllers/CabController.js
const Cab = require('../Models/CabModel');

// Function to get all available cabs
exports.getCabs = async (req, res) => {
    try {
        const cabs = await Cab.find(); // Get all cabs from the database
        const cabsWithImageUrls = cabs.map(cab => ({
            ...cab.toObject(),
            imageUrl: `/uploads/Cab/${cab.cabImage}` // Dynamically add the image URL
        }));
        res.json(cabsWithImageUrls); // Send back the cabs data as JSON
    } catch (error) {
        console.error('Error fetching cabs:', error);
        res.status(500).json({ message: 'Error fetching cabs' });
    }
};

// Add more functions like adding, updating, or deleting cabs if needed
