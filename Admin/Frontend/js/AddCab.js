document.getElementById("add-cab-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect cab data from form fields
    let cabData = {
        cabNumber: document.getElementById("cabNumber").value,
        cabModel: document.getElementById("cabModel").value,
        cabDriver: document.getElementById("cabDriver").value,
        cabDriverNumber: document.getElementById("cabDriverNumber").value, // Driver number
        cabPrice: document.getElementById("cabPrice").value,
        cabStatus: document.getElementById("cabStatus").value,
        cabImage: document.getElementById("cabImage").files[0], // File input
    };

    // Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append('cabNumber', cabData.cabNumber);
    formData.append('cabModel', cabData.cabModel);
    formData.append('cabDriver', cabData.cabDriver);
    formData.append('cabDriverNumber', cabData.cabDriverNumber); // Append driver number
    formData.append('cabPrice', cabData.cabPrice);
    formData.append('cabStatus', cabData.cabStatus);
    formData.append('cabImage', cabData.cabImage);

    // POST request to the backend
    fetch('/api/cabs/upload', { // Updated route
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload cab.'); // Throw error for non-2xx responses
        }
        return response.text();
    })
    .then(data => {
        alert('Cab added successfully!');
        console.log(data);
        document.getElementById("add-cab-form").reset(); // Clear form after success
    })
    .catch(error => {
        alert('Error uploading cab. Please try again.');
        console.error('Error:', error);
    });
});
