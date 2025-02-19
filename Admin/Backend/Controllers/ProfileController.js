const Admin = require('../Models/AdminModel'); 
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for profile image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage }).single('profileImage');

// Get Admin Profile
const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({
            success: true,
            admin: {
                name: admin.name,
                email: admin.email,
                mobileNumber: admin.mobileNumber,
                address: admin.address,
                dateOfBirth: admin.dateOfBirth,
                profileImage: admin.profileImage || null
            }
        });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch profile' });
    }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'File upload error', error: err.message });
        }

        try {
            const admin = await Admin.findById(req.admin._id);
            if (!admin) {
                return res.status(404).json({ success: false, message: 'Admin not found' });
            }

            // Handle new profile image if uploaded
            let profileImageUrl = admin.profileImage;

            if (req.file) {
                profileImageUrl = '/uploads/' + req.file.filename;
                // Remove old profile image if exists
                if (admin.profileImage && fs.existsSync(`.${admin.profileImage}`)) {
                    fs.unlinkSync(`.${admin.profileImage}`);
                }
            }

            // Update other fields
            const { name, email, phone, address, dob } = req.body;
            admin.name = name || admin.name;
            admin.email = email || admin.email;
            admin.mobileNumber = phone || admin.mobileNumber;
            admin.address = address || admin.address;
            admin.dateOfBirth = dob ? new Date(dob) : admin.dateOfBirth;
            admin.profileImage = profileImageUrl;

            // Save the updated admin profile
            await admin.save();

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                admin: {
                    name: admin.name,
                    email: admin.email,
                    mobileNumber: admin.mobileNumber,
                    address: admin.address,
                    dateOfBirth: admin.dateOfBirth,
                    profileImage: admin.profileImage
                }
            });
        } catch (error) {
            console.error('Error updating admin profile:', error);
            res.status(500).json({ success: false, message: 'Failed to update profile' });
        }
    });
};

module.exports = { getAdminProfile, updateAdminProfile }; // Ensure both are exported as functions
