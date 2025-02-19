 // Fetch room data from the server and display it
 fetch('/rooms')
 .then(response => response.json())
 .then(data => {
     const roomCardsContainer = document.getElementById('room-cards');
     data.forEach(room => {
         const roomCard = document.createElement('div');
         roomCard.classList.add('room-card');
         
         // Create Image Element
         const img = document.createElement('img');
         img.src = room.imageUrl;  // Image URL will be like /uploads/room1.jpg
         img.alt = `Room ${room.roomNumber}`;
         img.classList.add('room-img');
         roomCard.appendChild(img);
         
         // Create Room Info
         const roomInfo = document.createElement('div');
         roomInfo.classList.add('room-info');
         
         const roomTitle = document.createElement('h4');
         roomTitle.textContent = `Room ${room.roomNumber}`;
         roomInfo.appendChild(roomTitle);
         
         const roomDescription = document.createElement('p');
         roomDescription.textContent = room.roomDescription;
         roomInfo.appendChild(roomDescription);
         
         roomCard.appendChild(roomInfo);
         roomCardsContainer.appendChild(roomCard);
     });
 })
 .catch(error => console.error('Error fetching room data:', error));