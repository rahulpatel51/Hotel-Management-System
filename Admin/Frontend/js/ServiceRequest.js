document.addEventListener('DOMContentLoaded', async function () {
    const requestListContainer = document.getElementById('request-list');
    const modal = document.getElementById('request-details-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    
    let requests = [];  // Store fetched requests temporarily

    // Fetch housekeeping requests from the backend
    async function fetchRequests() {
        try {
            const response = await fetch('/api/housekeeping/requests');
            if (!response.ok) throw new Error('Failed to fetch requests');
            requests = await response.json();

            requestListContainer.innerHTML = ''; // Clear current list

            requests.forEach(request => {
                const requestItem = document.createElement('div');
                requestItem.classList.add('request-item');
                requestItem.dataset.id = request._id;

                requestItem.innerHTML = `
                    <h4>Request from Room ${request.roomNumber}</h4>
                    <p><strong>Name:</strong> ${request.name}</p>
                    <p><strong>Email:</strong> ${request.email}</p>
                    <p><strong>Status:</strong> ${request.status}</p>
                    <div class="buttons">
                        <button class="view" onclick="viewRequest('${request._id}')">View</button>
                    </div>
                `;
                
                requestListContainer.appendChild(requestItem);
            });
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    }

    // View request details
    window.viewRequest = function (requestId) {
        const request = requests.find(req => req._id === requestId);
        if (request) {
            document.getElementById('modal-room-number').textContent = request.roomNumber;
            document.getElementById('modal-name').textContent = request.name;
            document.getElementById('modal-email').textContent = request.email;
            document.getElementById('modal-phone').textContent = request.phone;
            document.getElementById('modal-special-request').textContent = request.specialRequest || 'None';
            document.getElementById('modal-price').textContent = request.price;

            // Show the modal (change display property to block)
            modal.style.display = 'block';

            // Set the accept/reject button actions
            const acceptBtn = document.getElementById('accept-btn');
            const rejectBtn = document.getElementById('reject-btn');
            
            // Disable buttons if the request is already accepted or rejected
            if (request.status === 'accepted' || request.status === 'rejected') {
                acceptBtn.disabled = true;
                rejectBtn.disabled = true;
                acceptBtn.textContent = request.status.charAt(0).toUpperCase() + request.status.slice(1); // Display status text
                rejectBtn.style.display = 'none';  // Hide reject button if already accepted
            } else {
                acceptBtn.disabled = false;
                rejectBtn.disabled = false;
                acceptBtn.textContent = 'Accept';
                rejectBtn.textContent = 'Reject';
                rejectBtn.style.display = 'inline';  // Show reject button if request is not accepted/rejected
            }

            acceptBtn.onclick = () => updateRequestStatus(requestId, 'accepted');
            rejectBtn.onclick = () => updateRequestStatus(requestId, 'rejected');
        }
    }

    // Close the modal when the close button is clicked
    closeModalBtn.onclick = function () {
        modal.style.display = 'none';
    }

    // Close the modal if the user clicks anywhere outside the modal content
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Update request status (Accept or Reject)
    async function updateRequestStatus(requestId, status) {
        try {
            const response = await fetch(`/api/housekeeping/requests/${requestId}`, {
                method: 'PUT',
                body: JSON.stringify({ status }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error('Failed to update status');

            // Reload requests after updating
            fetchRequests();

            // Show alert after status update
            alert(`Request has been ${status === 'accepted' ? 'Accepted' : 'Rejected'}`);

            // Close modal after status update
            modal.style.display = 'none';
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    }

    // Initialize page
    await fetchRequests();
});
