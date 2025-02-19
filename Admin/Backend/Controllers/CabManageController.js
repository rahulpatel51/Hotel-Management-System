const Cab = require('../Models/CabModel'); // Import Cab model

// Fetch all cabs
exports.getAllCabs = async (req, res) => {
    try {
        const cabs = await Cab.find(); // Fetch all cabs from the database
        res.json(cabs);
    } catch (error) {
        console.error('Error retrieving cabs:', error.message);
        res.status(500).json({ message: 'Failed to retrieve cabs. Please try again later.' });
    }
};

// Fetch a single cab by ID
exports.getCabById = async (req, res) => {
    try {
        const cab = await Cab.findById(req.params.id);
        if (!cab) {
            return res.status(404).json({ message: 'Cab not found.' });
        }
        res.json(cab);
    } catch (error) {
        console.error('Error retrieving cab details:', error.message);
        res.status(500).json({ message: 'Failed to retrieve cab details. Please try again later.' });
    }
};

// Update a cab
exports.updateCab = async (req, res) => {
    const { cabModel, cabNumber, cabDriver, cabDriverNumber, cabStatus } = req.body; // Ensure correct field names
    try {
        const updatedCab = await Cab.findByIdAndUpdate(
            req.params.id,
            { cabModel, cabNumber, cabDriver, cabDriverNumber, cabStatus },
            { new: true } // Return the updated document
        );
        if (!updatedCab) {
            return res.status(404).json({ message: 'Cab not found.' });
        }
        res.json(updatedCab);
    } catch (error) {
        console.error('Error updating cab:', error.message);
        res.status(500).json({ message: 'Failed to update cab. Please try again later.' });
    }
};

// Delete a cab
exports.deleteCab = async (req, res) => {
    try {
        const deletedCab = await Cab.findByIdAndDelete(req.params.id);
        if (!deletedCab) {
            return res.status(404).json({ message: 'Cab not found.' });
        }
        res.json({ message: 'Cab deleted successfully.' });
    } catch (error) {
        console.error('Error deleting cab:', error.message);
        res.status(500).json({ message: 'Failed to delete cab. Please try again later.' });
    }
};
