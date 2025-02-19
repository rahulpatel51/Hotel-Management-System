const express = require('express');
const multer = require('multer');
const path = require('path');
const EmployeeController = require('../Controllers/EmployeeController');

const router = express.Router();

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/Employees/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST route to handle employee upload
router.post('/uploadEmployee', upload.single('employeeImage'), EmployeeController.addEmployee);

module.exports = router;
