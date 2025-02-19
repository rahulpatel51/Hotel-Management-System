// Get the modal and button elements
const modal = document.getElementById('booking-form');
const bookNowButtons = document.querySelectorAll('.book-now');
const closeBtn = document.querySelector('.close-btn');

// Function to open the modal and populate the cab details
function openBookingForm(cabType, price) {
    // Set the cab type and price exactly as they are in the modal fields
    document.getElementById('cab-type').value = cabType;
    document.getElementById('price').value = price;
    modal.style.display = 'flex';  // Show modal
}

// Function to close the modal
function closeBookingForm() {
    modal.style.display = 'none';  // Hide modal
}

// Add event listener to all "Book Now" buttons
bookNowButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the cab type and price from data attributes
        const cabType = button.getAttribute('data-cab-type');
        const price = button.getAttribute('data-price');
        openBookingForm(cabType, price);
    });
});

// Close modal when the close button is clicked
closeBtn.addEventListener('click', closeBookingForm);

// Close the modal when the overlay is clicked
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeBookingForm();
    }
});

async function fetchCabs() {
    try {
        const response = await fetch('/api/cabs'); // Fetch data from the backend API
        const cabs = await response.json(); // Parse the JSON response
        
        const cabCardsContainer = document.querySelector('.cab-booking-cards');
        cabCardsContainer.innerHTML = '';  // Clear any existing cab cards
        
        // Loop through the cabs and create HTML dynamically
        cabs.forEach(cab => {
            const cabCard = document.createElement('div');
            cabCard.classList.add('cab-card');
            cabCard.innerHTML = `
                <img src="${cab.imageUrl}" alt="${cab.cabModel}">
                <div class="cab-info">
                    <h3>${cab.cabModel}</h3>
                    <p>${cab.cabDescription}</p>
                    <span class="price">$${cab.cabPrice}</span>
                    <button class="book-now" data-cab-type="${cab.cabModel}" data-price="${cab.cabPrice}">Book Now</button>
                </div>
            `;
            cabCardsContainer.appendChild(cabCard);  // Append the card to the container
        });

    } catch (error) {
        console.error('Error fetching cabs:', error);
    }
}

// Fetch cabs data when the page is loaded
document.addEventListener('DOMContentLoaded', fetchCabs);
