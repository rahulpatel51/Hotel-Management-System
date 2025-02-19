document.addEventListener('DOMContentLoaded', async function () {
    // Fetch and display admin profile details on page load
    try {
        const response = await fetch('/api/admin/get-profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Use token for authorization
            }
        });

        const data = await response.json();
        if (data.success) {
            // Populate profile fields with fetched data
            document.getElementById("adminName").textContent = data.admin.name;
            document.getElementById("adminEmail").textContent = data.admin.email;
            document.getElementById("adminPhone").textContent = data.admin.mobileNumber;
            document.getElementById("adminAddress").textContent = data.admin.address;
            document.getElementById("adminDOB").textContent = data.admin.dateOfBirth;
            // Set profile image if available
            if (data.admin.profileImage) {
                document.getElementById("adminImage").src = data.admin.profileImage;
            }
        } else {
            alert("Failed to load profile details!");
        }
    } catch (error) {
        alert("Error fetching profile details!");
    }

    // Profile image change functionality
    document.getElementById("profileImageInput").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("adminImage").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Edit Profile Modal
    const editProfileBtn = document.getElementById("editProfileBtn");
    const modal = document.getElementById("editProfileModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const saveBtn = document.getElementById("saveBtn");

    // Show the modal when edit button is clicked
    editProfileBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close the modal when close button is clicked
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Save changes and update profile
    saveBtn.addEventListener("click", async () => {
        const name = document.getElementById("modalName").value;
        const email = document.getElementById("modalEmail").value;
        const phone = document.getElementById("modalPhone").value;
        const address = document.getElementById("modalAddress").value;
        const dob = document.getElementById("modalDOB").value;
        const profileImage = document.getElementById("profileImageInput").files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('dob', dob);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await fetch('/api/admin/update-profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                alert("Profile updated successfully!");
                modal.style.display = "none";
                // Update profile details on page
                document.getElementById("adminName").textContent = name;
                document.getElementById("adminEmail").textContent = email;
                document.getElementById("adminPhone").textContent = phone;
                document.getElementById("adminAddress").textContent = address;
                document.getElementById("adminDOB").textContent = dob;
                if (data.admin.profileImage) {
                    document.getElementById("adminImage").src = data.admin.profileImage;
                }
            } else {
                alert("Failed to update profile!");
            }
        } catch (error) {
            alert("Error updating profile!");
        }
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
