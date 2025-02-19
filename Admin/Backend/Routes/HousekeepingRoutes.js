const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const HousekeepingService = require('../Models/HousekeepingServiceModel.js');

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/HouseKeeping/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({ storage });

// Route to add a new housekeeping service
router.post('/add', upload.single('serviceImage'), async (req, res) => {
  const { serviceName, serviceDescription, servicePrice, serviceStatus } = req.body;
  const serviceImage = req.file ? req.file.filename : null; // Store image filename

  if (!serviceName || !serviceDescription || !servicePrice || !serviceStatus || !serviceImage) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newService = new HousekeepingService({
      name: serviceName,
      description: serviceDescription,
      price: servicePrice,
      status: serviceStatus,
      image: serviceImage,
    });

    // Save the new service to the database
    await newService.save();

    res.status(201).json({ message: 'Housekeeping service added successfully' });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Failed to add housekeeping service' });
  }
});

// Route to fetch all housekeeping services
router.get('/', async (req, res) => {
  try {
    // Fetch all services from the database
    const services = await HousekeepingService.find();
    
    // Send the services as the response
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch housekeeping services' });
  }
});


module.exports = router;
