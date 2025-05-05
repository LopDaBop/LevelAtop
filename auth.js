// auth.js
(function enforceLogin() {
    const currentPage = window.location.pathname;

    // Pages that shouldn't require login
    const publicPages = ['login.html', 'register.html'];

    // If the current page is public, skip the check
    if (publicPages.some(p => currentPage.endsWith(p))) return;

    // Otherwise, check for a logged in user
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        window.location.replace("login.html");
    }
})();
