const mongoose = require('mongoose');

// Helper function to generate 6-digit random employee ID
const generateEmployeeId = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
};

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    unique: true,  // Ensure employeeId is unique
    required: true,
    default: generateEmployeeId, // Use default to generate a random ID on creation
  },
  employeeName: {
    type: String,
    required: true
  },
  employeeEmail: {
    type: String,
    required: true,
    unique: true
  },
  employeePhone: {
    type: String,
    required: true
  },
  employeePosition: {
    type: String,
    required: true
  },
  employeeSalary: {
    type: String,
    required: true
  },
  employeeAddress: {
    type: String,
    required: true
  },
  employeeImage: {
    type: String,
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
