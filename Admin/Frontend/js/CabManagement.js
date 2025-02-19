document.addEventListener('DOMContentLoaded', async function () {
    const modal = document.getElementById('editCabModal');
    const closeModal = document.getElementById('closeModal');
    const cabListTableBody = document.querySelector('.cab-table tbody'); // Table body where cab data will be inserted

    // Fetch cabs from the backend and populate the table
    const fetchAndPopulateCabs = async () => {
        cabListTableBody.innerHTML = ''; // Clear existing table rows
        const response = await fetch('/api/cabs');
        const cabs = await response.json();

        cabs.forEach(cab => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cab.cabId}</td>
                <td>${cab.cabModel}</td>
                <td>${cab.cabNumber}</td>
                <td>${cab.cabDriver}</td>
                <td>${cab.cabDriverNumber}</td>
                <td>${cab.cabStatus}</td>
                <td>
                    <button class="btn-edit" data-id="${cab._id}">Edit</button>
                    <button class="btn-delete" data-id="${cab._id}">Delete</button>
                </td>
            `;
            cabListTableBody.appendChild(row);
        });

        attachEventListeners(); // Reattach event listeners to new buttons
    };

    // Attach event listeners to dynamically created buttons
    const attachEventListeners = () => {
        const editButtons = document.querySelectorAll('.btn-edit');
        const deleteButtons = document.querySelectorAll('.btn-delete');

        // Open Edit Modal
        editButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const cabId = e.target.dataset.id;

                try {
                    // Fetch cab details from the backend
                    const response = await fetch(`/api/cabs/${cabId}`);
                    const cabData = await response.json();

                    // Populate modal fields
                    document.getElementById('cabID').value = cabData.cabId;
                    document.getElementById('cabModel').value = cabData.cabModel;
                    document.getElementById('cabNumber').value = cabData.cabNumber;
                    document.getElementById('driverName').value = cabData.cabDriver;
                    document.getElementById('driverNumber').value = cabData.cabDriverNumber;
                    document.getElementById('cabStatus').value = cabData.cabStatus;

                    // Show the modal
                    modal.style.display = 'block';
                } catch (error) {
                    console.error('Error fetching cab details:', error);
                    alert('Failed to load cab details.');
                }
            });
        });

        // Handle Delete
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const cabId = e.target.dataset.id;
                const confirmation = confirm(`Are you sure you want to delete Cab ID ${cabId}?`);
                if (confirmation) {
                    // Send DELETE request to delete the cab
                    await fetch(`/api/cabs/${cabId}`, {
                        method: 'DELETE',
                    });

                    // Refresh the table
                    await fetchAndPopulateCabs();
                    alert(`Cab ID ${cabId} deleted successfully.`);
                }
            });
        });
    };

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission (Save changes)
    document.getElementById('editCabModal').addEventListener('submit', async (e) => {
        e.preventDefault();

        const cabId = document.getElementById('cabID').value;
        const cabModel = document.getElementById('cabModel').value;
        const cabNumber = document.getElementById('cabNumber').value;
        const cabDriver = document.getElementById('driverName').value;
        const cabDriverNumber = document.getElementById('driverNumber').value;
        const cabStatus = document.getElementById('cabStatus').value;

        const updatedCab = { cabId, cabModel, cabNumber, cabDriver, cabDriverNumber, cabStatus };

        // Send PUT request to update the cab
        await fetch(`/api/cabs/${cabId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCab),
        });

        alert('Cab details updated successfully!');
        modal.style.display = 'none';

        // Refresh the table
        await fetchAndPopulateCabs();
    });

    // Initial fetch and populate
    await fetchAndPopulateCabs();
});
