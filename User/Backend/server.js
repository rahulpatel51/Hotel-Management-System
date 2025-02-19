const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/UserRoutes');
const roomRoutes = require('./Routes/RoomRoute');
const cabRoutes = require('./Routes/CabRoutes');
const weddingHallRoutes = require('./Routes/WeddingHallRoutes');
const profileRoutes = require('./Routes/ProfileRoutes'); 
const googleRoutes = require('./Routes/GoogleRoutes');
const passport = require('passport'); // Import passport for authentication

require('./Config/Passport'); // Passport configuration

dotenv.config(); // Load environment variables from .env file

const app = express();

// Connect to the database
connectDB();

// Middleware to parse form data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/api/user', userRoutes);
app.use('/rooms', roomRoutes);
app.use('/api', cabRoutes);
app.use('/weddinghalls', weddingHallRoutes);
app.use('/api/user', profileRoutes);
app.use('/api/auth', googleRoutes);

// Serve the UserLogin page when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/UserLogin.html'));
});

// Serve static files (such as images, CSS, JS)
app.use(express.static(path.join(__dirname, '../Frontend')));

// Serve images from Admin/Backend/uploads (Adjusted to reflect folder structure)
app.use('/uploads', express.static(path.join(__dirname, '../../Admin/Backend/uploads')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Start the server using the port defined in .env (default to 5000 if not provided)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
