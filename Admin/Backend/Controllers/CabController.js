const path = require('path');
const Cab = require('../Models/CabModel');

// POST: Upload cab and image
const uploadCab = async (req, res) => {
  const { cabNumber, cabModel, cabDriver, cabDriverNumber, cabPrice, cabStatus } = req.body;
  const cabImage = req.file ? req.file.filename : null;

  // Generate a 4-digit unique cabId using Math.random()
  const cabId = 'CAB' + Math.floor(Math.random() * 9000 + 1000);

  const newCab = new Cab({
    cabId,
    cabNumber,
    cabModel,
    cabDriver,
    cabDriverNumber,
    cabPrice,
    cabStatus,
    cabImage,
  });

  try {
    await newCab.save();
    console.log('Cab added to database:', newCab);
    res.send('Cab and image uploaded successfully!');
  } catch (error) {
    console.log('Error saving cab to database:', error);
    res.status(500).send('Failed to upload cab and image.');
  }
};

module.exports = { uploadCab };
