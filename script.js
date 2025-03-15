// Mobile Menu Toggle
function toggleMenu() {
    let menu = document.getElementById("mobile-menu");
    let icon = document.querySelector(".menu-icon");

    menu.classList.toggle("active");

    // Toggle between ☰ and × icons
    icon.textContent = menu.classList.contains("active") ? "×" : "☰";
}

// Close the mobile menu when a menu item is clicked
function closeMenu() {
    let menu = document.getElementById("mobile-menu");
    let icon = document.querySelector(".menu-icon");

    // Close the menu
    menu.classList.remove("active");

    // Reset the icon to ☰
    icon.textContent = "☰";
}

// Ensure DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function() {
    
    // Dynamically set the current year in the footer
    let yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Contact Form Submission
    let contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            let form = event.target;
            let submitButton = form.querySelector("button");
            let successMessage = document.getElementById("success-message");

            submitButton.disabled = true; // Prevent duplicate submissions

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
    }

    // Newsletter Signup Form
    let newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let form = event.target;
            let formData = new FormData(form);

            fetch("https://formspree.io/f/mjkyvngy", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            })
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                let successMsg = document.getElementById("newsletter-success-message");
                let errorMsg = document.getElementById("newsletter-error-message");

                if (data.ok) {
                    successMsg.style.display = "block";
                    errorMsg.style.display = "none";
                    form.reset(); // Clear form fields
                } else {
                    successMsg.style.display = "none";
                    errorMsg.style.display = "block";
                }
            })
            .catch(error => {
                document.getElementById("newsletter-error-message").style.display = "block";
                document.getElementById("newsletter-success-message").style.display = "none";
            });
        });
    }
});
