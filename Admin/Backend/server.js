const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./Config/db'); 
const adminRoutes = require('./Routes/AdminRoutes');
const profileRoutes = require('./Routes/ProfileRoutes'); // Adjust path as necessary
const AdminMiddleware = require('./Middleware/AdminMiddleware'); // Adjust path as necessary

const roomRoute = require('./Routes/RoomRoute');
const cabRoutes = require('./Routes/CabRoutes');
const employeeRoutes = require('./Routes/EmployeeRoutes');
const weddingHallRoutes = require('./Routes/WeddingHallRoutes');
const cabManageRoutes = require('./Routes/CabManageRoute');
const roomManageRoutes = require('./Routes/RoomManageRoute');
const employeeManageRoutes = require('./Routes/EmployeemanageRoute');
const weddingHallManageRoutes = require('./Routes/WeddingHallManageRoute');
const housekeepingRoutes = require('./Routes/HousekeepingRoutes');
const serviceRequestRoutes = require('./Routes/ServiceRequestRoutes');

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);          // Admin related routes
app.use('/admin', profileRoutes);       // Profile related routes
app.use('/upload', roomRoute);               // Room related routes (uploads)
app.use('/api/cabs', cabRoutes);             // Cab service related routes
app.use('/api', employeeRoutes);             // Employee related routes
app.use('/api', weddingHallRoutes);          // Wedding hall related routes
app.use('/api', cabManageRoutes);            // Cab management related routes
app.use('/rooms', roomManageRoutes);         // Room management related routes
app.use('/api/employees', employeeManageRoutes);  // Employee management routes
app.use('/getWeddingHalls', weddingHallManageRoutes);  // Wedding hall management routes
app.use('/api/housekeeping', housekeepingRoutes); // Housekeeping routes
app.use('/api/housekeeping/requests', serviceRequestRoutes);  // Service request routes

// Default route for frontend (AdminLogin.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/AdminLogin.html'));
});

// Serve static files for frontend (CSS, JS, images)
app.use(express.static(path.join(__dirname, '../Frontend')));

// Static upload path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Server listening on the defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
