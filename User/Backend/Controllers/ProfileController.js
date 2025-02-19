const User = require('../Models/UserModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // To handle file deletion

// Set up multer storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage }).single('profilePicture'); // Handling single file upload

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        // Fetch user from the database using the ID from the token
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Format the dob field
        const formattedDob = user.dob ? user.dob.toISOString().split('T')[0] : null;

        // Respond with the user's profile data
        res.status(200).json({
            user: {
                fullName: user.fullName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                address: user.address,
                dob: formattedDob, // Send formatted DOB
                userType: user.userType,
                profilePicture: user.profilePicture || null // Profile picture might be null
            }
        });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Failed to fetch user profile', error: err.message });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload error', error: err.message });
        }

        try {
            // Find the user based on the ID from the token
            const user = await User.findById(req.user._id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Handle the new profile picture if uploaded
            let profilePictureUrl = user.profilePicture;

            if (req.file) {
                // Save the new profile picture path
                profilePictureUrl = '/uploads/' + req.file.filename;

                // Delete the old profile picture if it exists
                if (user.profilePicture && fs.existsSync(`.${user.profilePicture}`)) {
                    fs.unlinkSync(`.${user.profilePicture}`);
                }
            }

            // Update text fields if provided
            const { fullName, email, mobileNumber, address, dob } = req.body;
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.mobileNumber = mobileNumber || user.mobileNumber;
            user.address = address || user.address;
            user.dob = dob ? new Date(dob) : user.dob; // Parse and update DOB
            user.profilePicture = profilePictureUrl;

            // Save the updated user profile
            await user.save();

            // Format the updated dob field
            const formattedDob = user.dob ? user.dob.toISOString().split('T')[0] : null;

            // Respond with success message and updated profile data
            res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    fullName: user.fullName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    address: user.address,
                    dob: formattedDob, // Send formatted DOB
                    profilePicture: user.profilePicture
                }
            });
        } catch (err) {
            console.error('Error updating user profile:', err);
            res.status(500).json({ message: 'Failed to update profile', error: err.message });
        }
    });
};

module.exports = { getUserProfile, updateUserProfile };
