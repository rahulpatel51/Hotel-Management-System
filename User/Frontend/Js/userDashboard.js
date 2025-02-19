document.addEventListener("DOMContentLoaded", async () => {
    const userNameElement = document.getElementById("userName");
    const userImgElement = document.getElementById("userImg");
    const userNameInfoElement = document.getElementById("userNameSpan");
    const profileEmailElement = document.getElementById("profileEmail");
    const profilePhoneElement = document.getElementById("profilePhone");

    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // If no token is present, redirect to login page
    if (!token) {
        window.location.href = 'UserLogin.html';
        return;
    }

    try {
        // Fetch user profile from the server
        const response = await fetch('/api/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include token in the request header
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        const user = data.user;

        console.log('User Profile Data:', user);

        // Update profile details on the dashboard
        userNameElement.textContent = user.fullName || "Guest";
        userImgElement.src = user.profilePicture || "./Images/profile.png";
        userNameInfoElement.textContent = user.fullName || "Guest";
        profileEmailElement.textContent = user.email || "N/A";
        profilePhoneElement.textContent = user.mobileNumber || "Phone number not available";
    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert("There was an issue loading your profile. Please try again later.");
    }
});
