# 🏨 Hotel Management System  

A **full-stack hotel management system** built with **HTML, CSS, JavaScript, Node.js, Express, Multer, and MongoDB**. This system provides an advanced management solution for **Rooms, Cabs, Halls, and Housekeeping services**, along with a **User Dashboard** to manage personal bookings.  

---

## 🌟 Features  

### 🧑‍💼 User Features  
- 🔐 **User Authentication** (Signup/Login with JWT)  n 
- 📋 **User Dashboard** (View & Manage Bookings)  
- 🏠 **Book Rooms** (Add, Edit, Cancel Bookings)  
- 🚖 **Request Cabs** (Book & Manage Rides)  
- 🎉 **Reserve Halls** (Banquet Hall Booking)  
- 🧹 **Housekeeping Requests** (Cleaning Services)  
- 🛒 **Payment Integration** (For Room & Hall Bookings)  

### 🛠️ Admin Features  
- 📂 **Room Management** (Add, Edit, Delete Rooms)  
- 🚖 **Cab Management** (View & Approve Requests)  
- 🎉 **Hall Reservations** (Manage Hall Bookings)  
- 🧹 **Housekeeping Requests** (Approve/Decline Requests)  
- 📊 **Admin Dashboard** (User, Booking, and Payment Overview)  

---

## 🚀 Tech Stack  

| **Technology**       | **Usage**                |  
|----------------------|-------------------------|  
| **HTML, CSS, JS**    | Frontend UI Design       |  
| **Node.js + Express.js** | Backend API         |  
| **MongoDB + Mongoose** | Database Management   |  
| **Multer**           | File Uploads (Images)   |  
| **JWT Authentication** | User Login System     |  
| **Stripe/PayPal API** | Payment Integration    |  

---

## 📂 Folder Structure  

Hotel-Management-System/
│── backend/
│ ├── config/ # Database Connection
│ ├── models/ # Mongoose Models (Users, Rooms, Cabs, Halls, Housekeeping, Payments)
│ ├── routes/ # API Routes (Rooms, Cabs, Halls, Housekeeping, Users, Payments)
│ ├── controllers/ # Business Logic
│ ├── middleware/ # Auth Middleware
│ ├── uploads/ # Room, Cab, Hall Images
│ ├── server.js # Main Server File
│
│── frontend/
│ ├── assets/ # Images, Icons, CSS
│ ├── pages/ # HTML Pages (Home, Booking, Housekeeping, User Dashboard)
│ ├── scripts/ # JavaScript Files
│ ├── index.html # Home Page
│
│── README.md
│── package.json
│── .gitignore


## 📂 Project Preview  

### 🔐 User & Admin Login  
<p align="center">
  <img src="https://github.com/rahulpatel51/Hotel-Management-System/blob/main/User_Login.png" width="45%" alt="User Login">
  <img src="https://github.com/rahulpatel51/Hotel-Management-System/blob/main/Admin_Login.png" width="45%" alt="Admin Login">
</p>  

### 📊 User & Admin Dashboard  
<p align="center">
  <img src="https://github.com/rahulpatel51/Hotel-Management-System/blob/main/User_Dashboard.png" width="45%" alt="User Dashboard">
  <img src="https://github.com/rahulpatel51/Hotel-Management-System/blob/main/Admin_Dashboard.png" width="45%" alt="Admin Dashboard">
</p>  

---

## 🔧 Installation & Setup  

### **Step 1: Clone the Repository**  
```bash
git clone https://github.com/rahulpatel51/Hotel-Management-System.git
cd Hotel-Management-System

Step 2: Setup Backend
cd backend/Admin
npm install  # Install dependencies

Run the backend server:
npm start
The Admin backend server will run on http://localhost:5000.

Step 3: Setup Backend
cd backend/User
npm install  # Install dependencies

Run the backend server:
npm start
The Admin backend server will run on http://localhost:5001.

🚀 Happy Coding! 😊✨
