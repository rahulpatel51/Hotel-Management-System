// script.js

document.getElementById('add-room-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Collect form data

    fetch('./upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        alert('Room added successfully!');
        console.log(data);
    })
    .catch(error => {
        alert('Error uploading room');
        console.error(error);
    });
});
