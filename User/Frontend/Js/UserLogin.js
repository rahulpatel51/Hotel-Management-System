// Show Login Form
document.addEventListener("DOMContentLoaded", function () {
  console.log(localStorage.getItem('authToken')); // Check authToken in localStorage
  console.log(localStorage.getItem('token'));     // Check token in localStorage
  console.log(localStorage.getItem('userToken')); // Check userToken in localStorage

  const token = localStorage.getItem('token');
  const currentPage = window.location.pathname;

  // Check if user is logged in
  if (token) {
    // If token exists, redirect to dashboard if on login page
    if (currentPage === '/UserLogin.html') {
      window.location.href = 'UserDashboard.html'; // Redirect to dashboard
    }
  } else {
    // If token does not exist, redirect to login if on dashboard page
    if (currentPage === '/UserDashboard.html') {
      window.location.href = 'UserLogin.html'; // Redirect to login page
    }
  }
});

// Show Login Form
function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleBtn = document.getElementById("btn");

  loginForm.style.display = "block";
  signupForm.style.display = "none";
  toggleBtn.style.left = "0";
}

// Show Signup Form
function showSignup() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleBtn = document.getElementById("btn");

  loginForm.style.display = "none";
  signupForm.style.display = "block";
  toggleBtn.style.left = "130px";
}

// Toggle password visibility for login and signup forms
function togglePasswordVisibility(formType) {
  const passwordField = document.getElementById(formType === 'login' ? 'loginPassword' : 'signupPassword');
  const checkbox = document.getElementById(formType === 'login' ? 'showPasswordLogin' : 'showPasswordSignup');
  
  if (checkbox.checked) {
    passwordField.type = 'text'; // Show password
  } else {
    passwordField.type = 'password'; // Hide password
  }
}

// Forgot Password Button
function forgotPassword() {
  // Implement forgot password functionality (e.g., redirect to forgot password page)
  alert("Forgot Password functionality to be implemented.");
}

// Google Login Function
async function googleLogin() {
  window.location.href = "/api/auth/google"; // Redirect to backend Google authentication
}

// Signup Function
async function signupUser(event) {
  event.preventDefault();
  
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullName, email, password })
    });

    const data = await response.json();

    if (response.status === 201) {
      alert("User Signup Successful"); // Show success alert
      window.location.href = 'UserLogin.html'; // Redirect to login page
    } else {
      alert(data.message || 'Signup failed!'); // Show error message
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('An error occurred. Please try again.');
  }
}

// Login Function
async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem('token', data.token); // Save token to localStorage
      alert("User Login Successful"); // Show success alert
      window.location.href = 'UserDashboard.html'; // Redirect to dashboard
    } else {
      alert(data.message || 'Login failed!'); // Show error message
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred. Please try again.');
  }
}

// Check if user is already logged in on page load (Login and Dashboard)
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem('token');
  const currentPage = window.location.pathname;

  if (token) {
    // If token exists, redirect to dashboard if on login page
    if (currentPage === '/UserLogin.html') {
      window.location.href = 'UserDashboard.html'; // Redirect to dashboard
    }
  } else {
    // If token does not exist, redirect to login if on dashboard page
    if (currentPage === '/UserDashboard.html') {
      window.location.href = 'UserLogin.html'; // Redirect to login page
    }
  }
});
