// Admin Dashboard JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {
    // Sidebar Toggle (Hamburger Menu)
    const sidebarToggleButton = document.querySelector('#sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggleButton) {
        sidebarToggleButton.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('sidebar-active');
        });
    }

    // Profile menu toggle
    const profileMenuButton = document.querySelector('#profileMenuButton');
    const profileMenu = document.querySelector('.profile-menu');
    
    if (profileMenuButton) {
        profileMenuButton.addEventListener('click', function () {
            profileMenu.classList.toggle('show');
        });
    }

    // Dashboard stats update with random data (replace with real data)
    const statCards = document.querySelectorAll('.stat-card p');
    
    statCards.forEach(statCard => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        statCard.textContent = `${randomNumber} Bookings`;
    });
});

document.getElementById("profileImageInput").addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Update the profile image
            document.getElementById("adminImage").src = e.target.result;
        };

        reader.readAsDataURL(file); // Read the image file
    }
});

// Open and close modal
const editProfileBtn = document.getElementById("editProfileBtn");
const editProfileModal = document.getElementById("editProfileModal");
const closeModal = document.getElementById("closeModal");

editProfileBtn.addEventListener("click", () => {
    editProfileModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    editProfileModal.style.display = "none";
});

// Save changes to profile
const editProfileForm = document.getElementById("editProfileForm");

editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("editName").value;
    const email = document.getElementById("editEmail").value;

    // Optional password handling
    const password = document.getElementById("editPassword").value;

    // Update profile on the page
    document.getElementById("adminName").textContent = name;
    document.getElementById("adminEmail").textContent = email;

    // TODO: Send the updated profile to the backend (via API call)
    console.log("Profile Updated:", { name, email, password });

    // Close the modal
    editProfileModal.style.display = "none";
});
