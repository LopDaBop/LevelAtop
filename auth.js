function checkAuthentication() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        window.location.href = "login.html";
    }
}

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}
