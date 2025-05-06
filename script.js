// === Authentication ===

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || {};
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const users = getUsers();

  if (users[username] && users[username].password === password) {
    localStorage.setItem("currentUser", username);
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
}

function register(event) {
  event.preventDefault();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const users = getUsers();

  if (users[username]) {
    alert("Username already exists.");
    return;
  }

  users[username] = {
    password,
    attributes: {
      Intelligence: 0,
      Knowledge: 0,
      Strength: 0,
      Health: 0
    }
  };

  setUsers(users);
  localStorage.setItem("currentUser", username);
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function navigate(page) {
  window.location.href = page;
}

function getCurrentUserData() {
  const username = localStorage.getItem("currentUser");
  const users = getUsers();
  return users[username];
}

function saveCurrentUserData(data) {
  const username = localStorage.getItem("currentUser");
  const users = getUsers();
  users[username] = data;
  setUsers(users);
}

// === Home Page ===

if (window.location.pathname.includes("index.html")) {
  const username = localStorage.getItem("currentUser");
  if (!username) window.location.href = "login.html";

  const user = getCurrentUserData();
  document.getElementById("username-display").textContent = `User: ${username}`;

  const totalXP = Object.values(user.attributes).reduce((a, b) => a + b, 0);
  const level = Math.floor(totalXP / 770);
  document.getElementById("level-display").textContent = `Level: ${level}`;

  const closestAttr = Object.entries(user.attributes).sort((a, b) => b[1] % 770 - a[1] % 770)[0];
  const progress = closestAttr[1] % 770;
  const xpPercent = Math.min((progress / 770) * 100, 100);

  document.getElementById("xp-fill").style.width = xpPercent + "%";
  document.getElementById("xp-fill").textContent = `${closestAttr[0]} XP: ${progress}/770`;
}

// === Attributes Page (optional enhancement later) ===
// You can add Chart.js here if you'd like

// === Profile Page ===

if (window.location.pathname.includes("profile.html")) {
  const user = getCurrentUserData();
  const username = localStorage.getItem("currentUser");
  const totalXP = Object.values(user.attributes).reduce((a, b) => a + b, 0);
  const level = Math.floor(totalXP / 770);

  const container = document.getElementById("profile-info");
  container.innerHTML = `
    <p>Username: ${username}</p>
    <p>Level: ${level}</p>
    <p>Attributes:</p>
    <ul>
      ${Object.entries(user.attributes).map(([key, value]) => `<li>${key}: ${value}</li>`).join("")}
    </ul>
  `;
}

// === Socials Page ===

if (window.location.pathname.includes("socials.html")) {
  const currentUser = localStorage.getItem("currentUser");
  const users = getUsers();
  const friendsList = document.getElementById("friends");
  const searchResults = document.getElementById("search-results");

  // Dummy friends for now (later add addFriend() functionality)
  friendsList.innerHTML = `
    <li>
      <p>FriendUsername</p>
      <button onclick="alert('Viewing profile')">Profile</button>
      <button onclick="alert('Opening chat')">Chat</button>
    </li>
  `;

  window.searchUsers = function (query) {
    searchResults.innerHTML = "";
    if (!query) return;
    Object.keys(users).forEach(username => {
      if (username !== currentUser && username.includes(query)) {
        const item = document.createElement("li");
        item.textContent = username;
        const addBtn = document.createElement("button");
        addBtn.textContent = "Add";
        addBtn.onclick = () => alert("Friend request sent to " + username);
        item.appendChild(addBtn);
        searchResults.appendChild(item);
      }
    });
  };

  window.showSearch = function () {
    document.getElementById("right-panel").innerHTML = `
      <input type="text" placeholder="Search users..." oninput="searchUsers(this.value)" />
      <ul id="search-results"></ul>
    `;
  };
}
