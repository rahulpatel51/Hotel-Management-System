const WeddingHall = require('../Models/WeddingHallModel');

// Fetch all wedding halls
exports.getWeddingHalls = async (req, res) => {
    try {
        const weddingHalls = await WeddingHall.find();
        res.json(weddingHalls);
    } catch (error) {
        console.error('Error fetching wedding halls:', error);
        res.status(500).send('Failed to fetch wedding halls.');
    }
};

// Update wedding hall details
exports.updateWeddingHall = async (req, res) => {
    const { hallNumber } = req.params;
    const { hallName, hallType, hallPrice, hallStatus } = req.body;

    if (!hallName || !hallType || !hallPrice || !hallStatus) {
        return res.status(400).send('Missing required fields.');
    }

    try {
        const updatedHall = await WeddingHall.findOneAndUpdate(
            { hallNumber },
            { hallName, hallType, hallPrice, hallStatus },
            { new: true }
        );
        if (!updatedHall) {
            return res.status(404).send('Wedding hall not found.');
        }
        res.json(updatedHall);
    } catch (error) {
        console.error('Error updating wedding hall:', error);
        res.status(500).send('Failed to update wedding hall.');
    }
};

// Delete wedding hall
exports.deleteWeddingHall = async (req, res) => {
    const { hallNumber } = req.params;

    try {
        const deletedHall = await WeddingHall.findOneAndDelete({ hallNumber });
        if (!deletedHall) {
            return res.status(404).send('Wedding hall not found.');
        }
        res.send('Wedding hall deleted successfully.');
    } catch (error) {
        console.error('Error deleting wedding hall:', error);
        res.status(500).send('Failed to delete wedding hall.');
    }
};
