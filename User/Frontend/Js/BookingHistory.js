// Get modal elements
const modal = document.getElementById('bookingModal');
const modalType = document.getElementById('modal-type');
const modalDate = document.getElementById('modal-date');
const modalDetail = document.getElementById('modal-detail');
const modalPrice = document.getElementById('modal-price');
const closeModalButton = document.querySelector('.close-modal');

// Get all "View Details" buttons
const viewDetailsButtons = document.querySelectorAll('.view-details');

// Open modal and populate data
viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function () {
        const bookingItem = button.parentElement;
        modalType.textContent = bookingItem.dataset.type;
        modalDate.textContent = bookingItem.dataset.date;
        modalDetail.textContent = bookingItem.dataset.detail;
        modalPrice.textContent = bookingItem.dataset.price;

        modal.style.display = 'flex'; // Show modal
    });
});

// Close modal functionality
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide modal
});

// Close modal when clicking outside the modal content
window.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
