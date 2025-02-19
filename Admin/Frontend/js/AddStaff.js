document.getElementById("add-employee-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collecting form data
    const employeeData = new FormData(this);

    // Simple validation
    const employeeName = document.getElementById("employeeName").value;
    const employeeEmail = document.getElementById("employeeEmail").value;
    const employeePhone = document.getElementById("employeePhone").value;
    const employeePosition = document.getElementById("employeePosition").value;
    const employeeSalary = document.getElementById("employeeSalary").value;
    const employeeAddress = document.getElementById("employeeAddress").value;

    if (!employeeName || !employeeEmail || !employeePhone || !employeePosition || !employeeSalary || !employeeAddress) {
        alert("Please fill out all fields.");
        return;
    }

    // Send the data to the server
    fetch("/api/uploadEmployee", {
        method: "POST",
        body: employeeData, // Send form data to the backend
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Email or phone number already exists!') {
            alert("Email or phone number already exists!");
        } else if (data === 'Employee and image uploaded successfully!') {
            alert("Employee added successfully!");
            document.getElementById("add-employee-form").reset();
        } else {
            alert("Error adding employee.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});
