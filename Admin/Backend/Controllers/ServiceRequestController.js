const HousekeepingRequest = require('../Models/ServiceRequestModel');

// Create a new housekeeping request
exports.createRequest = async (req, res) => {
    try {
        const { roomNumber, serviceType, specialRequest, price, name, email, phone } = req.body;
        const newRequest = new HousekeepingRequest({
            roomNumber,
            serviceType,
            specialRequest,
            price,
            name,
            email,
            phone,
        });

        await newRequest.save();
        res.status(201).json({ message: 'Housekeeping request submitted successfully!' });
    } catch (error) {
        console.error('Error creating housekeeping request:', error);
        res.status(500).json({ message: 'Failed to submit request' });
    }
};

// Get all housekeeping requests for admin
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await HousekeepingRequest.find();
        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Failed to fetch requests' });
    }
};

// Update the status of a housekeeping request (accept or reject)
exports.updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedRequest = await HousekeepingRequest.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json({ message: `Request status updated to ${status}` });
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ message: 'Failed to update request status' });
    }
};
