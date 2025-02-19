// Backend/routes/EmployeeRoutes.js
const express = require('express');
const router = express.Router();
const EmployeeController = require('../Controllers/EmployeeManageController');
const multer = require('multer');
const path = require('path');

// Set up multer for handling image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/Employees/'); // Specify the folder for employee images
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Get file extension
        const fileName = Date.now() + fileExtension; // Generate a unique filename
        cb(null, fileName); // Set the filename
    }
});

const upload = multer({ storage: storage });

// Routes for CRUD operations
router.get('/getStaffDetails', EmployeeController.getStaffDetails);
router.get('/getStaff/:id', EmployeeController.getStaffById);
router.put('/updateStaff/:id', upload.single('employeeImage'), EmployeeController.updateStaff); // Handle image upload
router.delete('/deleteStaff/:id', EmployeeController.deleteStaff);

module.exports = router;
