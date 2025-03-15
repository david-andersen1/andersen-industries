// Mobile Menu Toggle
function toggleMenu() {
    let menu = document.getElementById("mobile-menu");
    let icon = document.querySelector(".menu-icon");

    menu.classList.toggle("active");

    // Toggle between ☰ and × icons
    if (menu.classList.contains("active")) {
        icon.textContent = "×"; // Show 'X' when menu is open
    } else {
        icon.textContent = "☰"; // Show hamburger when menu is closed
    }
}

<!-- Contact Form Submission -->
<script>
    document.getElementById("contact-form").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission

        let form = event.target;
        let submitButton = form.querySelector("button");
        let successMessage = document.getElementById("success-message");

        submitButton.disabled = true; // Disable button to prevent duplicate submissions

        try {
            let formData = new FormData(form);
            let response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                successMessage.style.display = "block"; // Show success message
                form.reset(); // Clear form fields
            } else {
                alert("Error sending message. Please try again.");
            }
        } catch (error) {
            alert("Network error. Please check your connection and try again.");
        } finally {
            submitButton.disabled = false; // Re-enable button
        }
    });
</script>

// Newsletter Signup Form
document.getElementById("newsletter-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission

    var form = event.target;
    var formData = new FormData(form);

    fetch("https://formspree.io/f/mjkyvngy", {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json"  // Prevents redirect by requesting JSON response
        }
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.ok) {
            document.getElementById("newsletter-success-message").style.display = "block"; // Show success message
            document.getElementById("newsletter-error-message").style.display = "none"; // Hide error message
            form.reset();  // Clear the form
        } else {
            document.getElementById("newsletter-error-message").style.display = "block"; // Show error message
            document.getElementById("newsletter-success-message").style.display = "none"; // Hide success message
        }
    })
    .catch(error => {
        document.getElementById("newsletter-error-message").style.display = "block"; // Show error message
        document.getElementById("newsletter-success-message").style.display = "none"; // Hide success message
    });
});

// Dynamically set the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();
