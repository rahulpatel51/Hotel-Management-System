// Preview Image on Upload
function previewImage(event) {
    const input = event.target;
    const profileImg = document.getElementById('profileImage');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            profileImg.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        profileImg.src = "../Images/profile.png"; // Default image if no file selected
    }
}

// Fetch and Display User Data
async function fetchUserData() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../UserLogin.html'; // Redirect if no token
    }

    try {
        const response = await fetch('/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.status === 200) {
            // Populate profile data
            document.getElementById('userName').textContent = data.user.fullName;
            document.getElementById('userEmail').innerHTML = `<strong>Email:</strong> ${data.user.email}`;
            document.getElementById('userMobile').innerHTML = `<strong>Mobile:</strong> ${data.user.mobileNumber}`;
            document.getElementById('userAddress').innerHTML = `<strong>Address:</strong> ${data.user.address}`;
            document.getElementById('userDOB').innerHTML = `<strong>Date of Birth:</strong> ${data.user.dob}`;
            document.getElementById('userType').innerHTML = `<strong>User Type:</strong> ${data.user.userType}`;

            if (data.user.profilePicture) {
                document.getElementById('profileImage').src = data.user.profilePicture;
            }
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error('Error fetching user data:', err);
    }
}

// Edit Profile Modal Logic
const editProfileBtn = document.getElementById('editProfileBtn');
const profileModal = document.getElementById('profileModal');
const closeModal = document.getElementById('closeModal');
const saveChangesBtn = document.getElementById('saveChangesBtn');

// Show modal when clicking 'Edit Profile'
editProfileBtn.addEventListener('click', () => {
    console.log("Edit button clicked!"); // Debugging log
    profileModal.style.display = 'flex'; // Show modal
    const userName = document.getElementById('userName').textContent;
    const userEmail = document.getElementById('userEmail').textContent.split(': ')[1];
    const userMobile = document.getElementById('userMobile').textContent.split(': ')[1];
    const userAddress = document.getElementById('userAddress').textContent.split(': ')[1];
    const userDOB = document.getElementById('userDOB').textContent.split(': ')[1];

    // Pre-fill the modal fields with current user data
    document.getElementById('editName').value = userName;
    document.getElementById('editEmail').value = userEmail;
    document.getElementById('editMobile').value = userMobile;
    document.getElementById('editAddress').value = userAddress;
    document.getElementById('editDOB').value = userDOB;
});

// Close modal when clicking 'x'
closeModal.addEventListener('click', () => {
    profileModal.style.display = 'none'; // Hide modal
});

// Close modal if user clicks outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        profileModal.style.display = 'none'; // Hide modal on outside click
    }
});

// Save Changes Logic
saveChangesBtn.addEventListener('click', async () => {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const mobile = document.getElementById('editMobile').value;
    const address = document.getElementById('editAddress').value;
    const dob = document.getElementById('editDOB').value;
    const profilePicInput = document.getElementById('editProfilePic'); // Assuming file input for profile picture

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        return;
    }

    const formData = new FormData();
    formData.append('fullName', name);
    formData.append('email', email);
    formData.append('mobileNumber', mobile);
    formData.append('address', address);
    formData.append('dob', dob);
    if (profilePicInput.files[0]) {
        formData.append('profilePicture', profilePicInput.files[0]); // Append the profile picture file
    }

    try {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData // Sending formData which contains profile picture and text data
        });

        const data = await response.json();
        if (response.status === 200) {
            // Update profile info on the page
            document.getElementById('userName').textContent = name;
            document.getElementById('userEmail').innerHTML = `<strong>Email:</strong> ${email}`;
            document.getElementById('userMobile').innerHTML = `<strong>Mobile:</strong> ${mobile}`;
            document.getElementById('userAddress').innerHTML = `<strong>Address:</strong> ${address}`;
            document.getElementById('userDOB').innerHTML = `<strong>Date of Birth:</strong> ${dob}`;

            if (data.user.profilePicture) {
                document.getElementById('profileImage').src = data.user.profilePicture;
            }

            profileModal.style.display = 'none'; // Close modal
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error('Error saving profile data:', err);
    }
});

// Load the user profile data when the page loads
window.onload = fetchUserData;
