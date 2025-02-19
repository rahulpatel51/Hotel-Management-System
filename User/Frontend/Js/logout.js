// Logout Function
function logoutUser() {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page and replace current history entry to prevent going back
    window.location.replace('/UserLogin.html'); // Ya admin ke liye: '/AdminLogin.html'
}

// Check if logout button exists on the page and add event listener
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
});
