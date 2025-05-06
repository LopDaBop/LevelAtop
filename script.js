document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[currentUser];

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const attributes = user.attributes || {};
  const totalXP = Object.values(attributes).reduce((a, b) => a + b, 0);
  const level = Math.floor(totalXP / 770);
  const xpToLevelUp = 770;

  // Find the attribute closest to leveling up
  let closestAttr = '';
  let minXPNeeded = Infinity;
  for (const [attr, xp] of Object.entries(attributes)) {
    const xpNeeded = xpToLevelUp - (xp % xpToLevelUp);
    if (xpNeeded < minXPNeeded) {
      minXPNeeded = xpNeeded;
      closestAttr = attr;
    }
  }

  const currentAttrXP = attributes[closestAttr] || 0;
  const currentXPPercent = Math.floor((currentAttrXP % xpToLevelUp) / xpToLevelUp * 100);

  document.getElementById('xp-bar').style.width = `${currentXPPercent}%`;
  document.getElementById('xp-label').textContent = `${closestAttr}: ${currentAttrXP % xpToLevelUp} / ${xpToLevelUp}`;
  document.getElementById('username-display').textContent = `Username: ${currentUser}`;
  document.getElementById('level-display').textContent = `Level: ${level}`;

  // Leaderboard
  const leaderboardEl = document.getElementById('leaderboard');
  const sortedUsers = Object.entries(users).sort((a, b) => {
    const totalA = Object.values(a[1].attributes || {}).reduce((x, y) => x + y, 0);
    const totalB = Object.values(b[1].attributes || {}).reduce((x, y) => x + y, 0);
    return totalB - totalA;
  });

  for (const [username, data] of sortedUsers) {
    const userLevel = Math.floor(Object.values(data.attributes || {}).reduce((x, y) => x + y, 0) / 770);
    const li = document.createElement('li');
    li.textContent = `${username} - Level ${userLevel}`;
    leaderboardEl.appendChild(li);
  }
});

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
