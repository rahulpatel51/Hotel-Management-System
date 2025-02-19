const modal = document.getElementById('booking-form');
const closeBtn = document.querySelector('.close-btn');

function openBookingForm(roomType, price) {
    document.getElementById('room-type').value = roomType;
    document.getElementById('price').value = price;
    modal.style.display = 'flex';
}

function closeBookingForm() {
    modal.style.display = 'none';
}

async function fetchRooms() {
    try {
        const response = await fetch('/rooms');
        const rooms = await response.json();

        const roomCardsContainer = document.querySelector('.room-booking-cards');
        roomCardsContainer.innerHTML = '';

        rooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.classList.add('room-card');

            roomCard.innerHTML = `
                <img src="${room.imageUrl}" alt="${room.roomType}">
                <div class="room-info">
                    <h3>${room.roomType}</h3>
                    <p>${room.roomDescription}</p>
                    <span class="price">$${room.roomPrice} / night</span>
                    <button class="book-now" data-room-type="${room.roomType}" data-price="${room.roomPrice}">Book Now</button>
                </div>
            `;

            roomCardsContainer.appendChild(roomCard);
        });

        document.querySelectorAll('.book-now').forEach(button => {
            button.addEventListener('click', () => {
                const roomType = button.getAttribute('data-room-type');
                const price = button.getAttribute('data-price');
                openBookingForm(roomType, price);
            });
        });
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
}

closeBtn.addEventListener('click', closeBookingForm);

window.addEventListener('click', event => {
    if (event.target === modal) closeBookingForm();
});

document.addEventListener('DOMContentLoaded', fetchRooms);
