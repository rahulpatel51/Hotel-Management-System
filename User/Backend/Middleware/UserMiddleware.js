const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel'); // Ensure this import points to the correct model

const UserMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
        
        // Fetch user details from the database using the user ID
        const user = await User.findById(decoded.user); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user details to the request object
        req.user = user;

        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = UserMiddleware;
