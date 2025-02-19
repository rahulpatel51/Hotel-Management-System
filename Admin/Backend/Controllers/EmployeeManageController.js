// Backend/Controllers/EmployeeController.js
const Employee = require('../Models/EmployeeModel');

// Get all staff details
exports.getStaffDetails = async (req, res) => {
    try {
        const staff = await Employee.find(); // Get all employees from the database
        res.json(staff);
    } catch (error) {
        console.error('Error fetching staff details:', error);
        res.status(500).json({ message: 'Failed to retrieve staff details.' });
    }
};

// Get a specific staff member by ID
exports.getStaffById = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Employee.findOne({ employeeId: id });
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found.' });
        }
        res.json(staff);
    } catch (error) {
        console.error('Error fetching staff details for editing:', error);
        res.status(500).json({ message: 'Failed to retrieve staff details.' });
    }
};

// Update staff details
exports.updateStaff = async (req, res) => {
    const { id } = req.params;
    const { staffName, staffEmail, staffPhone, staffPosition, staffSalary } = req.body;
    const staffImage = req.file ? req.file.filename : null;

    try {
        const staff = await Employee.findOne({ employeeId: id });
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found.' });
        }

        // Update staff details
        staff.employeeName = staffName || staff.employeeName;
        staff.employeeEmail = staffEmail || staff.employeeEmail;
        staff.employeePhone = staffPhone || staff.employeePhone;
        staff.employeePosition = staffPosition || staff.employeePosition;
        staff.employeeSalary = staffSalary || staff.employeeSalary;
        if (staffImage) {
            staff.employeeImage = staffImage;
        }

        await staff.save(); // Save the updated staff details to the database
        res.json({ message: 'Staff details updated successfully!' });
    } catch (error) {
        console.error('Error updating staff details:', error);
        res.status(500).json({ message: 'Failed to update staff details.' });
    }
};

// Delete staff member
exports.deleteStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Employee.findOne({ employeeId: id });
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found.' });
        }

        // Delete the staff member from the database
        await staff.remove();
        res.json({ success: true, message: 'Staff deleted successfully!' });
    } catch (error) {
        console.error('Error deleting staff member:', error);
        res.status(500).json({ success: false, message: 'Failed to delete staff.' });
    }
};
