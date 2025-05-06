document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const usernameElement = document.getElementById('username');
  const userLevelElement = document.getElementById('userLevel');
  const xpBar = document.getElementById('xpBar');
  const currentXPElement = document.getElementById('currentXP');
  const currentAttributeElement = document.getElementById('currentAttribute');
  const attributeXPBar = document.getElementById('attributeXPBar');

  // Restore user data from localStorage
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const attributes = JSON.parse(localStorage.getItem('attributes'));

  if (user) {
    usernameElement.textContent = user.username;
    userLevelElement.textContent = user.level;
  }

  // Update XP Bar and Attribute progress
  const updateXPProgress = () => {
    let totalXP = 0;
    let closestAttribute = '';

    // Calculate total XP and find the closest attribute to leveling up
    for (let key in attributes) {
      totalXP += attributes[key].xp;
      if (!closestAttribute || attributes[key].xp < 770) {
        closestAttribute = key;
      }
    }

    // Update XP display
    currentXPElement.textContent = totalXP;
    xpBar.style.width = `${(totalXP / 770) * 100}%`;

    // Display closest attribute to level up
    currentAttributeElement.textContent = `Closest Attribute to Leveling Up: ${closestAttribute}`;

    // Update the closest attribute XP bar
    attributeXPBar.style.width = `${(attributes[closestAttribute].xp / 770) * 100}%`;
  };

  updateXPProgress();

  // Handle login (making sure it's stored and checks when logged out)
  const loginUser = () => {
    const loginDetails = {
      username: 'User', // replace with dynamic login details
      level: 1, // set initial level
    };
    localStorage.setItem('currentUser', JSON.stringify(loginDetails));
    window.location.href = 'index.html';
  };

  // Handle Logout
  document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });

  // Event listeners for buttons
  document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  document.getElementById('attributesButton').addEventListener('click', () => {
    window.location.href = 'attributes.html';
  });

  document.getElementById('profileButton').addEventListener('click', () => {
    window.location.href = 'profile.html';
  });
});
