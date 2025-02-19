// Get the modal and button elements
const modal = document.getElementById('booking-form');
const bookNowButtons = document.querySelectorAll('.book-now');
const closeBtn = document.querySelector('.close-btn');

// Function to open the modal and populate the wedding hall details
function openBookingForm(hallType, price) {
    // Set the hall type and price exactly as they are in the modal fields
    document.getElementById('hall-type').value = hallType;
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
        // Get the hall type and price from data attributes
        const hallType = button.getAttribute('data-hall-type');
        const price = button.getAttribute('data-price');
        openBookingForm(hallType, price);
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


// Fetch wedding halls from the backend and display them dynamically
async function fetchWeddingHalls() {
    try {
        const response = await fetch('/weddinghalls'); // Fetch wedding halls data from backend
        const weddingHalls = await response.json();  // Parse the JSON response
        
        const weddingHallCardsContainer = document.querySelector('.wedding-hall-booking-cards');
        weddingHallCardsContainer.innerHTML = '';  // Clear any existing hall cards
        
        // Loop through the halls and create HTML dynamically
        weddingHalls.forEach(hall => {
            const hallCard = document.createElement('div');
            hallCard.classList.add('hall-card');
            
            hallCard.innerHTML = `
                <img src="${hall.imageUrl}" alt="${hall.hallName}">
                <div class="hall-info">
                    <h3>${hall.hallName}</h3>
                    <p>${hall.hallDescription}</p>
                    <span class="price">$${hall.hallPrice} / event</span>
                    <button class="book-now" data-hall-type="${hall.hallName}" data-price="${hall.hallPrice}">Book Now</button>
                </div>
            `;
            
            // Append the new hall card to the container
            weddingHallCardsContainer.appendChild(hallCard);
        });
        
        // Add event listeners to all the "Book Now" buttons
        const bookNowButtons = document.querySelectorAll('.book-now');
        bookNowButtons.forEach(button => {
            button.addEventListener('click', function() {
                const hallType = button.getAttribute('data-hall-type');
                const price = button.getAttribute('data-price');
                openBookingForm(hallType, price);
            });
        });

    } catch (error) {
        console.error('Error fetching wedding halls:', error);
    }
}

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', closeBookingForm);

// Close the modal when the overlay is clicked
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeBookingForm();
    }
});

// Fetch wedding halls data when the page is loaded
document.addEventListener('DOMContentLoaded', fetchWeddingHalls);
