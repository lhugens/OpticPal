// Get the button and spinner elements
const submitButtonPal = document.getElementById('submitButtonPal');
const buttonTextPal = document.getElementById('buttonTextPal');
const loadingSpinner = document.getElementById('loadingSpinner');

// Add event listener for button click
submitButtonPal.addEventListener('click', function(event) {
    // Prevent the default form submit behavior
    event.preventDefault();

    // Disable the button to prevent multiple clicks
    submitButtonPal.classList.add('disabled');

    // Add loading state
    submitButtonPal.classList.add('loading');

    // Change the button text to 'Searching...'
    buttonTextPal.innerText = 'Searching...';

    // Simulate a search process (e.g., AJAX request)
    setTimeout(function() {
        // Once the search is complete, reset everything
        submitButtonPal.classList.remove('loading');
        submitButtonPal.classList.remove('disabled');
        buttonTextPal.innerText = 'Search for pals'; // Reset the button text
    }, 3000); // Simulate a 3-second search time
});

