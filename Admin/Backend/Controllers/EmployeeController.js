const Employee = require('../Models/EmployeeModel');

// Function to create a new employeess
const addEmployee = async (req, res) => {
  const { employeeName, employeeEmail, employeePhone, employeePosition, employeeSalary, employeeAddress } = req.body;
  const employeeImage = req.file ? req.file.filename : null;

  // Check if email or phone number already exists
  const existingEmployeeByEmail = await Employee.findOne({ employeeEmail });
  const existingEmployeeByPhone = await Employee.findOne({ employeePhone });

  if (existingEmployeeByEmail || existingEmployeeByPhone) {
    return res.status(400).send('Email or phone number already exists!');
  }

  const newEmployee = new Employee({
    employeeName,
    employeeEmail,
    employeePhone,
    employeePosition,
    employeeSalary,
    employeeAddress,
    employeeImage,
  });

  try {
    await newEmployee.save();
    res.send('Employee and image uploaded successfully!');
  } catch (error) {
    console.error('Error saving employee to database:', error);
    res.status(500).send('Failed to upload employee and image.');
  }
};

module.exports = {
  addEmployee,
};
