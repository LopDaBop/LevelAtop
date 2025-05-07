function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

function requireLogin() {
    if (!getCurrentUser()) {
        window.location.href = "login.html";
    }
}

function updateXPBar() {
    const user = getCurrentUser();
    const totalXP = Object.values(user.attributes).reduce((a, b) => a + b, 0);
    const level = Math.floor(totalXP / 770);
    const xpTowardsNext = totalXP % 770;
    const percent = (xpTowardsNext / 770) * 100;

    const bar = document.getElementById("xp-bar");
    if (bar) {
        bar.style.width = `${percent}%`;
        bar.innerText = `Level ${level} – ${xpTowardsNext}/770 XP`;
    }

    // Update user display if needed
    const profileInfo = document.getElementById("profile-info");
    if (profileInfo) {
        profileInfo.innerText = `Welcome ${user.username}, Level ${level}`;
    }
}

function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(u => u.email === email && u.password === pass);

    if (found) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials");
    }
}

function registerUser(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
        alert("User already exists");
        return;
    }

    const newUser = {
        username,
        email,
        password: pass,
        attributes: { Intelligence: 0, Strength: 0, Health: 0, Knowledge: 0 },
        friends: []
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = "index.html";
}

window.onload = () => {
    if (document.getElementById("xp-bar")) updateXPBar();
    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", loginUser);
    }
    if (document.getElementById("register-form")) {
        document.getElementById("register-form").addEventListener("submit", registerUser);
    }
};
