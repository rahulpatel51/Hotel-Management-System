// Function to show the Admin Login form and hide the Signup form
function showAdminLogin() {
    const loginForm = document.getElementById("adminLoginForm");
    const signupForm = document.getElementById("adminSignupForm");
    const toggleBtn = document.getElementById("btn");

    loginForm.style.display = "block";
    signupForm.style.display = "none";
    toggleBtn.style.left = "0";
}

// Function to show the Admin Signup form and hide the Login form
function showAdminSignup() {
    const loginForm = document.getElementById("adminLoginForm");
    const signupForm = document.getElementById("adminSignupForm");
    const toggleBtn = document.getElementById("btn");

    loginForm.style.display = "none";
    signupForm.style.display = "block";
    toggleBtn.style.left = "130px";
}

// Function to handle Admin Signup
async function handleAdminSignup(event) {
    event.preventDefault(); // Prevent form from submitting

    const name = document.querySelector("#adminSignupForm input[placeholder='Full Name']").value;
    const email = document.querySelector("#adminSignupForm input[placeholder='Admin Email']").value;
    const password = document.getElementById("adminSignupPassword").value;

    const response = await fetch('/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message); // Show success message
        showAdminLogin(); // Switch to login form
    } else {
        alert(data.message); // Show error message
    }
}

// Function to handle Admin Login
async function handleAdminLogin(event) {
    event.preventDefault(); // Prevent form from submitting

    const email = document.querySelector("#adminLoginForm input[placeholder='Admin Email']").value;
    const password = document.getElementById("adminLoginPassword").value;

    const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message); // Show success message
        localStorage.setItem('token', data.token); // Store JWT token for future use
        // Redirect to admin dashboard or profile page
        window.location.href = '/AdminDashboard.html';
    } else {
        alert(data.message); // Show error message
    }
}

// Function to toggle password visibility in Admin Login Form
function toggleLoginPasswordVisibility() {
    const passwordField = document.getElementById("adminLoginPassword");
    const showPasswordCheckbox = document.getElementById("showLoginPassword");

    passwordField.type = showPasswordCheckbox.checked ? "text" : "password";
}

// Function to toggle password visibility in Admin Signup Form
function toggleSignupPasswordVisibility() {
    const passwordField = document.getElementById("adminSignupPassword");
    const showPasswordCheckbox = document.getElementById("showSignupPassword");

    passwordField.type = showPasswordCheckbox.checked ? "text" : "password";
}

// Event Listeners for Form Submission
document.getElementById("adminSignupForm").addEventListener("submit", handleAdminSignup);
document.getElementById("adminLoginForm").addEventListener("submit", handleAdminLogin);

// Google Admin Login (To be implemented when Google OAuth is set up)
function googleAdminLogin() {
    alert("Google Admin Login will be implemented here");
    // Implement Google login API here
}

// Google Admin Signup (To be implemented when Google OAuth is set up)
function googleAdminSignup() {
    alert("Google Admin Signup will be implemented here");
    // Implement Google signup API here
}
