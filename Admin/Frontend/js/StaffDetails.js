document.addEventListener('DOMContentLoaded', () => {
    const staffTable = document.querySelector('.staff-details-table tbody');
    const editStaffModal = document.getElementById('editStaffModal');
    const closeModal = document.getElementById('closeModal');
    const editStaffForm = document.getElementById('editStaffForm');

    // Fetch staff details from the server
    function fetchStaffDetails() {
        fetch('/api/employees/getStaffDetails')
            .then(response => response.json())
            .then(data => {
                staffTable.innerHTML = ''; // Clear the table body
                data.forEach(staff => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="/uploads/Employees/${staff.employeeImage}" alt="${staff.employeeName}" class="profile-img"></td>
                        <td>${staff.employeeId}</td>
                        <td>${staff.employeeName}</td>
                        <td>${staff.employeeEmail}</td>
                        <td>${staff.employeePhone}</td>
                        <td>${staff.employeePosition}</td>
                        <td>${staff.employeeSalary}</td>
                        <td>
                            <button class="btn-edit" data-id="${staff.employeeId}">Edit</button>
                            <button class="btn-delete" data-id="${staff.employeeId}">Delete</button>
                        </td>
                    `;
                    staffTable.appendChild(row);
                });

                // Add event listeners to Edit and Delete buttons
                document.querySelectorAll('.btn-edit').forEach(button => {
                    button.addEventListener('click', handleEditClick);
                });

                document.querySelectorAll('.btn-delete').forEach(button => {
                    button.addEventListener('click', handleDeleteClick);
                });
            })
            .catch(error => console.error('Error fetching staff details:', error));
    }

    // Handle Edit button click
    function handleEditClick(event) {
        const staffId = event.target.getAttribute('data-id');
        
        fetch(`/api/employees/getStaff/${staffId}`)
            .then(response => response.json())
            .then(data => {
                // Populate the form with staff data
                document.getElementById('staffId').value = data.employeeId;
                document.getElementById('staffName').value = data.employeeName;
                document.getElementById('staffEmail').value = data.employeeEmail;
                document.getElementById('staffPhone').value = data.employeePhone;
                document.getElementById('staffPosition').value = data.employeePosition;
                document.getElementById('staffSalary').value = data.employeeSalary;
                editStaffModal.style.display = 'block'; // Show the modal
            })
            .catch(error => console.error('Error fetching staff details for editing:', error));
    }

    // Handle Delete button click
    function handleDeleteClick(event) {
        const employeeId = event.target.getAttribute('data-id');
        
        if (confirm('Are you sure you want to delete this staff?')) {
            fetch(`/api/employees/deleteStaff/${employeeId}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    fetchStaffDetails(); // Refresh staff list
                })
                .catch(error => console.error('Error deleting staff:', error));
        }
    }

    // Close the modal
    closeModal.addEventListener('click', () => {
        editStaffModal.style.display = 'none';
    });

    // Handle staff edit form submission
    editStaffForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(editStaffForm);
        const staffId = formData.get('staffId');

        fetch(`/api/employees/updateStaff/${staffId}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            editStaffModal.style.display = 'none'; // Close the modal
            fetchStaffDetails(); // Refresh staff list
        })
        .catch(error => console.error('Error updating staff details:', error));
    });

    // Fetch staff details on page load
    fetchStaffDetails();
});
