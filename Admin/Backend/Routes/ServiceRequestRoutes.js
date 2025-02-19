const express = require('express');
const router = express.Router();
const housekeepingRequestController = require('../Controllers/ServiceRequestController');

// Route to create a new housekeeping request
router.post('/', housekeepingRequestController.createRequest);

// Route to get all housekeeping requests for admin
router.get('/', housekeepingRequestController.getAllRequests);

// Route to update the status of a housekeeping request (accept or reject)
router.put('/:id', housekeepingRequestController.updateRequestStatus);

module.exports = router;
