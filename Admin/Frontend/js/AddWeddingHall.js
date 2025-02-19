document.getElementById("add-wedding-hall-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let weddingHallData = new FormData();
    weddingHallData.append('hallNumber', document.getElementById("hallNumber").value);
    weddingHallData.append('hallName', document.getElementById("hallName").value);
    weddingHallData.append('hallCapacity', document.getElementById("hallCapacity").value);
    weddingHallData.append('hallPrice', document.getElementById("hallPrice").value);
    weddingHallData.append('hallLocation', document.getElementById("hallLocation").value);
    weddingHallData.append('hallStatus', document.getElementById("hallStatus").value);
    weddingHallData.append('hallImage', document.getElementById("hallImage").files[0]);
    weddingHallData.append('hallType', document.getElementById("hallType").value);
    weddingHallData.append('hallDescription', document.getElementById("hallDescription").value);

    fetch('/api/addWeddingHall', {
        method: 'POST',
        body: weddingHallData
    })
    .then(response => response.text())
    .then(data => {
        alert("Wedding Hall added successfully!");
        console.log(data);
    })
    .catch(error => {
        alert("Error adding Wedding Hall");
        console.error(error);
    });
});
