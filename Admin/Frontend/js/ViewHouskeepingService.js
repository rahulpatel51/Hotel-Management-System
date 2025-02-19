// Fetch the housekeeping services and display them dynamically
document.addEventListener('DOMContentLoaded', async function () {
    try {
      const response = await fetch('/api/housekeeping/');
      const services = await response.json();
  
      if (response.status === 200) {
        // Get the container where we will display the services
        const servicesContainer = document.querySelector('.housekeeping-cards');
        
        // Clear any existing cards (if any)
        servicesContainer.innerHTML = '';
  
        // Loop through the services and create service cards
        services.forEach(service => {
          const serviceCard = document.createElement('div');
          serviceCard.classList.add('service-card');
          
          // Create service card HTML structure
          serviceCard.innerHTML = `
            <img src="/uploads/HouseKeeping/${service.image}" alt="${service.name}" class="service-img">
            <div class="service-info">
              <h4>${service.name}</h4>
              <p>${service.description}</p>
              <p><strong>Price:</strong> $${service.price}</p>
              <p><strong>Status:</strong> ${service.status}</p>
            </div>
          `;
          
          // Append the card to the container
          servicesContainer.appendChild(serviceCard);
        });
      } else {
        alert('Error fetching services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Something went wrong while fetching services.');
    }
  });
  