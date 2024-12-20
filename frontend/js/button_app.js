function handleError(message) {
    alert(message);
}

// Function to add user to the waiting queue
async function addToQueue() {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            throw new Error("User data not found.");
        }

        const requestBody = {
            userId: user.email,
            userType: user.userType,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone
        };

        const response = await fetch(`${window.location.origin}/opticpal/api/user/start`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error("Failed to add user to the waiting queue.");
        }

        return { status: "success" };
    } catch (error) {
        console.error("Error adding user to the queue:", error);
        throw error;
    }
}

// Function to fetch a "pal" from the server
async function fetchPal() {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            throw new Error("User data not found.");
        }

        const requestBody = {
            userId: user.email,
            userType: user.userType,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone
        };

        const response = await fetch(`${window.location.origin}/opticpal/api/user`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch pal.");
        }
        return await response.json();
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
            <p><strong>First Name:</strong> ${palData.firstName}</p>
            <p><strong>Last Name:</strong> ${palData.lastName}</p>
            <p><strong>Phone:</strong> ${palData.phone}</p>
        </div>
    `;
}

submitButtonPal.addEventListener('click', async function (event) {
    event.preventDefault();
    submitButtonPal.classList.add('disabled');
    buttonTextPal.innerText = 'Adding you to the queue...';

    try {
        const queueResponse = await addToQueue();

        if (queueResponse.status === "success") {
            // Start polling the endpoint every 1 second
            intervalId = setInterval(async () => {
                try {
                    const palData = await fetchPal();
                    console.log("Polling for pal data...");
            
                    if (palData) {
                        console.log("Pal found:", palData);
            
                        // Stop the interval immediately after finding the pal
                        clearInterval(intervalId);
                        console.log("Interval cleared.");
            
                        // Display pal info
                        displayPal(palData);
            
                        // Reset the button state
                        submitButtonPal.classList.remove('disabled');
                        buttonTextPal.innerText = 'Search for pals';
                    }
                } catch (error) {
                    console.error("Error during polling:", error);
            
                    // Clear the interval on error to avoid repeated failures
                    clearInterval(intervalId);
                    console.log("Interval cleared due to error.");
            
                    // Reset the button state
                    submitButtonPal.classList.remove('disabled');
                    buttonTextPal.innerText = 'Search for pals';
            
                    // Optionally display an error message to the user
                    handleError("Failed to fetch pal. Please try again.");
                }
            }, 1000);
            
        } else {
            throw new Error("Failed to add user to the waiting queue.");
        }
    } catch (error) {
        handleError(error.message);
        submitButtonPal.classList.remove('disabled');
        buttonTextPal.innerText = 'Search for pals';
    }
});
