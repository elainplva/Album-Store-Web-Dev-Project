
document.getElementById('user-login').addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('emailAddressID').value;
    const password = document.getElementById('passwordID').value;

    if (email === "wmitty@email.com" && password === "password1") {
        // Successful login
        localStorage.setItem('loggedIn', 'true'); // Use string "true"
        alert("Login successful!");
        window.location.href = "shop.html"; // Redirect to shop
    } else {
        // Failed login
        alert("Invalid login details");
        localStorage.setItem('loggedIn', 'false'); // Use string "false"
        document.getElementById("loginerror").style.display = "block";
    }
});
