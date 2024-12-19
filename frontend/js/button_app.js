function handleError(message) {
    alert(message);
}


// Function to add user to the waiting queue
async function addToQueue() {

    try {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            throw new Error("User data not found.");
        }

        // Prepare the request body with user data
        const requestBody = {
            userId: user.email, // You can use any unique identifier from user data, e.g., email or id
            userType: user.userType,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone
        };

        const response = await fetch("http://127.0.0.1:8080/opticpal/api/user/start", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody) // Send the user data as the request body
        });

        if (!response.ok) {
            throw new Error("Failed to add user to the waiting queue.");
        }

        return {status: "success"}; // Assume this contains status or queue info
    } catch (error) {
        console.error("Error adding user to the queue:", error);
        throw error; // Re-throw to handle in the calling function
    }
}

// Function to fetch a "pal" from the server
async function fetchPal() {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            throw new Error("User data not found.");
        }

        // Prepare the request body with user data
        const requestBody = {
            userId: user.email, // You can use any unique identifier from user data, e.g., email or id
            userType: user.userType,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone
        };

        const response = await fetch("http://127.0.0.1:8080/opticpal/api/user", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody) // Send the user data as the request body
        });
        if (!response.ok) {
            throw new Error("Failed to fetch pal.");
        }
        const palData = await response.json();
        console.log("palFata")
        console.log(palData)
        return palData; // Assume this contains user info
    } catch (error) {
        console.error("Error fetching pal:", error);
        return null;
    }
}

// Function to update the UI with the found pal
function displayPal(palData) {
    const palContainer = document.getElementById("palContainer");
    palContainer.innerHTML = `
        <div class="pal-info">
            <p><strong>Name:</strong> ${palData.name}</p>
            <p><strong>Age:</strong> ${palData.age}</p>
            <p><strong>Gender:</strong> ${palData.gender}</p>
        </div>
    `;
}

// Add event listener for button click
submitButtonPal.addEventListener('click', async function (event) {
    // Prevent the default form submit behavior
    event.preventDefault();

    // Disable the button to prevent multiple clicks
    submitButtonPal.classList.add('disabled');
    buttonTextPal.innerText = 'Adding you to the queue...';

    try {
        // Step 1: Add the user to the queue
        const queueResponse = await addToQueue();

        // If user is added successfully, proceed to find a pal
        if (queueResponse.status === "success") {
            // Step 2: Start polling the endpoint every 1 second
            const intervalId = setInterval(async () => {
                const palData = await fetchPal();
                if (palData) {
                    displayPal(palData);

                    // Stop the interval once a pal is found
                    clearInterval(intervalId);

                    // Reset the button state
                    submitButtonPal.classList.remove('disabled');
                    buttonTextPal.innerText = 'Search for pals';
                }
            }, 1000); // Poll every 1 second
        } else {
            // Handle failure to add to queue
            throw new Error("Failed to add user to the waiting queue.");
        }
    } catch (error) {
        // Handle any errors
        handleError(error.message);
        // Reset button state in case of error
        submitButtonPal.classList.remove('disabled');
        buttonTextPal.innerText = 'Search for pals';
    }
});
