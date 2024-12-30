// custom.js 
// some basic functionality for login, checkout, userdetails
// amend and supplement in your project as you see fit




// run to update login/
var logout = document.getElementById('loginlogout');

// add a listener for add to cart if such a button id is pressed
logout.addEventListener("click", Logout);

function Logout() {

    // if user is logged in them log them out and redirect to home page
    var loggedin=localStorage.getItem('loggedIn'); 

    if (loggedin==1) {
        localStorage.setItem('loggedIn',0);
        window.location.href = "home.html";
    } else {
        window.location.href = "login.html";
    }
}


// check if user is logged in or logged out..
checkLoginStatus()

function checkLoginStatus() {
    const loggedIn = localStorage.getItem('loggedIn') === 'true'; // Correct comparison
    const userDetailsElement = document.getElementById("userdetails");

    if (loggedIn) {
        document.querySelector('#loginlogout').innerHTML = "Logout";
        userDetailsElement.classList.remove("d-none");
        userDetailsElement.classList.add("d-show");
    } else {
        document.querySelector('#loginlogout').innerHTML = "Login";
        document.querySelector('#loginlogout').setAttribute("href", "login.html");
        userDetailsElement.style.display = 'none';
    }
}

document.getElementById('loginlogout').addEventListener("click", function () {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    if (loggedIn) {
        localStorage.setItem('loggedIn', 'false');
        window.location.href = "index.html"; // Redirect to home page
    } else {
        window.location.href = "account.html"; // Redirect to login page
    }
});

checkLoginStatus();




