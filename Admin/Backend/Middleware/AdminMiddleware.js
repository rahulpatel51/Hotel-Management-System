const jwt = require('jsonwebtoken');
require('dotenv').config(); // Importing dotenv to use environment variables

// Middleware to check if user is authenticated
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, please log in' });
    }

    // Use JWT_SECRET from the environment variables
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.admin = decoded;
        next();
    });
};

module.exports = authMiddleware;
