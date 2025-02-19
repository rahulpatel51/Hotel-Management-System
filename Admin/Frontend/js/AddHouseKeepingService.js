// Handle form submission for adding a new housekeeping service
document.getElementById('add-housekeeping-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Gather form data
    const formData = new FormData();
    formData.append('serviceName', document.getElementById('serviceName').value);
    formData.append('serviceDescription', document.getElementById('serviceDescription').value);
    formData.append('servicePrice', document.getElementById('servicePrice').value);
    formData.append('serviceStatus', document.getElementById('serviceStatus').value);
    formData.append('serviceImage', document.getElementById('serviceImage').files[0]);
  
    try {
      const response = await fetch('/api/housekeeping/add', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.status === 201) {
        alert('Housekeeping service added successfully!');
      } else {
        alert(result.message || 'Error adding service.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
    }
  });
  