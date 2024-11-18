document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");
    const signupForm = document.querySelector("#signupForm");
    const toggleButtons = document.querySelectorAll(".toggle");

    // Toggle between login and signup forms
    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".login-form").classList.toggle("hidden");
            document.querySelector(".signup-form").classList.toggle("hidden");
        });
    });

    // Handle Signup Form Submission
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form from reloading the page
        const username = signupForm.username.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const result = await response.json();
            alert(result.message);

            if (response.ok) {
                signupForm.reset(); // Clear form on successful signup
                alert("Signup successful! You can now log in.");
            } else {
                console.error("Signup error:", result);
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    });

    // Handle Login Form Submission
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form from reloading the page
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Login successful");
                window.location.href = "nextpage.html"; // Redirect to nextpage.html on successful login
            } else {
                alert(result.message || "Login failed. Please try again.");
                console.error("Login error:", result);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    });
});
