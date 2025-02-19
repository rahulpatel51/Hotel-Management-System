// Fetch Wedding Halls from the server and populate the table
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/getWeddingHalls');
        const weddingHalls = await response.json();

        const tableBody = document.querySelector('.hall-table tbody');
        tableBody.innerHTML = ''; // Clear existing rows before adding new ones
        weddingHalls.forEach(hall => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${hall.hallNumber}</td>
                <td>${hall.hallName}</td>
                <td>${hall.hallType}</td>
                <td>$${hall.hallPrice}</td>
                <td>${hall.hallStatus}</td>
                <td>
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Reattach event listeners for Edit and Delete buttons after loading data
        attachEventListeners();
    } catch (error) {
        console.error('Error fetching wedding halls:', error);
        alert('Failed to load wedding halls.');
    }
});

// Attach event listeners for edit and delete buttons after the data is loaded
function attachEventListeners() {
    // Open Edit Modal
    const editButtons = document.querySelectorAll('.btn-edit');
    const modal = document.getElementById('editHallModal');
    const closeModal = document.getElementById('closeModal');

    editButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const hallNumber = row.querySelector('td:first-child').textContent;
            const hallName = row.querySelector('td:nth-child(2)').textContent;
            const hallType = row.querySelector('td:nth-child(3)').textContent;
            const hallPrice = row.querySelector('td:nth-child(4)').textContent.replace('$', '');
            const hallStatus = row.querySelector('td:nth-child(5)').textContent;

            // Populate modal fields
            document.getElementById('hallNumber').value = hallNumber;
            document.getElementById('hallName').value = hallName;
            document.getElementById('hallType').value = hallType;
            document.getElementById('hallPrice').value = hallPrice;
            document.getElementById('hallStatus').value = hallStatus;

            // Show the modal
            modal.style.display = 'block';
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal if clicked outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission (Save changes)
    document.getElementById('editHallForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const hallNumber = document.getElementById('hallNumber').value;
        const hallName = document.getElementById('hallName').value;
        const hallType = document.getElementById('hallType').value;
        const hallPrice = document.getElementById('hallPrice').value;
        const hallStatus = document.getElementById('hallStatus').value;

        try {
            // Send updated data to the server
            const response = await fetch(`/updateWeddingHall/${hallNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hallName, hallType, hallPrice, hallStatus })
            });

            if (response.ok) {
                alert('Hall details updated successfully!');
                location.reload(); // Reload page to reflect changes
            } else {
                alert('Failed to update wedding hall.');
            }

        } catch (error) {
            console.error('Error updating wedding hall:', error);
            alert('Error while updating wedding hall.');
        }

        // Close modal after saving
        modal.style.display = 'none';
    });

    // Handle Delete
const deleteButtons = document.querySelectorAll('.btn-delete');
deleteButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        // Get the row containing the delete button
        const row = e.target.closest('tr');
        const hallNumber = row.querySelector('td:first-child').textContent;

        // Confirm deletion
        const confirmation = confirm(`Are you sure you want to delete hall number ${hallNumber}?`);
        if (confirmation) {
            try {
                // Send delete request to the server
                const response = await fetch(`/deleteWeddingHall/${hallNumber}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove the row from the table
                    row.remove();
                    alert(`Hall number ${hallNumber} deleted successfully.`);
                } else {
                    alert('Failed to delete wedding hall.');
                }
            } catch (error) {
                console.error('Error deleting wedding hall:', error);
                alert('Error while deleting wedding hall.');
            }
        }
    });
});

}
