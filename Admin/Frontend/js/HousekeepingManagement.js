// Open modal for editing task
const editButtons = document.querySelectorAll('.btn-edit');
const modal = document.getElementById('editTaskModal');
const closeModal = document.getElementById('closeModal');

editButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'block';
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Handle form submission (Saving changes)
const editTaskForm = document.getElementById('editTaskForm');
editTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskId = document.getElementById('taskId').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const taskStatus = document.getElementById('taskStatus').value;

    // Assuming we use an API to save the data
    console.log(`Updated Task ID: ${taskId}, Room: ${roomNumber}, Assigned to: ${assignedTo}, Status: ${taskStatus}`);

    // Close modal after saving
    modal.style.display = 'none';
});

// Handling Delete functionality
const deleteButtons = document.querySelectorAll('.btn-delete');

deleteButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const taskId = e.target.closest('tr').querySelector('td:first-child').textContent;
        const confirmation = confirm(`Are you sure you want to delete task ID ${taskId}?`);
        if (confirmation) {
            // Implement deletion logic, like sending a delete request to the server
            e.target.closest('tr').remove(); // This removes the row from the table
            alert(`Housekeeping task ID ${taskId} deleted successfully.`);
        }
    });
});
