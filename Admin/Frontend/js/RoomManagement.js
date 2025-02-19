document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const roomTableBody = document.querySelector('.room-table tbody');
    const editRoomModal = document.getElementById('editRoomModal');
    const closeModalButton = document.getElementById('closeModal');
    const editRoomForm = document.getElementById('editRoomForm');
    const roomNumberInput = document.getElementById('roomNumber');
    const roomTypeInput = document.getElementById('roomType');
    const roomPriceInput = document.getElementById('roomPrice');
    const roomStatusInput = document.getElementById('roomStatus');
    
    // Fetch rooms from the backend and display them
    function fetchRooms() {
        fetch('/rooms')  // Adjust this API URL based on your backend setup
            .then(response => response.json())
            .then(rooms => {
                roomTableBody.innerHTML = ''; // Clear existing rows
                rooms.forEach(room => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${room.roomNumber}</td>
                        <td>${room.roomType}</td>
                        <td>${room.roomPrice}</td>
                        <td>${room.roomStatus}</td>
                        <td>
                            <button class="btn-edit" data-id="${room._id}">Edit</button>
                            <button class="btn-delete" data-id="${room._id}">Delete</button>
                        </td>
                    `;
                    roomTableBody.appendChild(row);
                });

                // Add event listeners for Edit and Delete buttons
                document.querySelectorAll('.btn-edit').forEach(button => {
                    button.addEventListener('click', openEditModal);
                });

                document.querySelectorAll('.btn-delete').forEach(button => {
                    button.addEventListener('click', deleteRoom);
                });
            })
            .catch(error => console.error('Error fetching rooms:', error));
    }

    // Open the edit room modal and pre-fill the form with room data
    function openEditModal(event) {
        const roomId = event.target.getAttribute('data-id');

        // Fetch the room data from the server
        fetch(`/rooms/${roomId}`)
            .then(response => response.json())
            .then(room => {
                roomNumberInput.value = room.roomNumber;
                roomTypeInput.value = room.roomType;
                roomPriceInput.value = room.roomPrice;
                roomStatusInput.value = room.roomStatus;

                // Set the form's data-id to the room's ID for later use
                editRoomForm.setAttribute('data-id', roomId);

                // Open the modal
                editRoomModal.style.display = 'block';
            })
            .catch(error => console.error('Error fetching room data:', error));
    }

    // Close the edit room modal
    closeModalButton.addEventListener('click', function () {
        editRoomModal.style.display = 'none';
    });

    // Close modal if clicked outside
    window.addEventListener('click', (e) => {
        if (e.target === editRoomModal) {
            editRoomModal.style.display = 'none';
        }
    });

    // Submit the edit form and update room details
    editRoomForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const roomId = editRoomForm.getAttribute('data-id');

        const updatedRoom = {
            roomNumber: roomNumberInput.value,
            roomType: roomTypeInput.value,
            roomPrice: roomPriceInput.value,
            roomStatus: roomStatusInput.value
        };

        fetch(`/rooms/${roomId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRoom)
        })
        .then(response => response.json())
        .then(data => {
            alert('Room updated successfully!');
            fetchRooms(); // Refresh room list
            editRoomModal.style.display = 'none'; // Close the modal
        })
        .catch(error => {
            alert('Error updating room');
            console.error(error);
        });
    });

    // Delete a room
    function deleteRoom(event) {
        const roomId = event.target.getAttribute('data-id');

        if (confirm('Are you sure you want to delete this room?')) {
            fetch(`/rooms/${roomId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert('Room deleted successfully!');
                fetchRooms(); // Refresh room list
            })
            .catch(error => {
                alert('Error deleting room');
                console.error(error);
            });
        }
    }

    // Initial fetch of rooms when the page loads
    fetchRooms();
});
