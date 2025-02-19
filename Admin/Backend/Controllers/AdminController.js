const Admin = require('../Models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Signup Controller
const adminSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, email, password: hashedPassword });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

// Admin Login Controller
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

module.exports = { adminSignup, adminLogin };
