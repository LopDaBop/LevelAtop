function navigate(page) {
  window.location.href = `../html/${page}`;
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../html/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "../html/login.html";
    return;
  }

  if (document.getElementById("profile-username")) {
    document.getElementById("profile-username").textContent = `Username: ${user.username}`;
    document.getElementById("profile-level").textContent = `Level: ${Math.floor(user.totalXP / 770)}`;
  }

  if (document.getElementById("xp-fill")) {
    const xpVals = Object.values(user.attributes || {});
    const closest = Math.min(...xpVals.map(x => 770 - x));
    const attribute = Object.keys(user.attributes).find(attr => 770 - user.attributes[attr] === closest);
    const progress = ((user.attributes[attribute] || 0) / 770) * 100;
    document.getElementById("xp-fill").style.width = `${progress}%`;
    document.getElementById("xp-value").textContent = `${user.attributes[attribute] || 0} / 770`;
  }

  if (document.getElementById("leaderboard-list")) {
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    const sorted = users.sort((a, b) => b.totalXP - a.totalXP).slice(0, 10);
    document.getElementById("leaderboard-list").innerHTML = sorted.map(u => `<li>${u.username} - Lvl ${Math.floor(u.totalXP / 770)}</li>`).join("");
  }
});
