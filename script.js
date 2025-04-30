const defaultAttributes = {
    Intelligence: 1,
    Knowledge: 1,
    Strength: 1,
    Health: 1
};

function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function loadUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('profileName').innerText = user.name;
        document.getElementById('profileLevel').innerText = `Level: ${getUserLevel(user)}`;
        document.getElementById('authSection').style.display = 'none';
        renderRadar(user.attributes);
        updateLeaderboard(user);
    } else {
        renderRadar(defaultAttributes);
    }
}

function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById("registerName").value;
    const user = {
        name: name,
        attributes: { ...defaultAttributes }
    };
    saveUser(user);
    window.location.href = "index.html";
}

function loginUser(event) {
    event.preventDefault();
    const name = document.getElementById("loginName").value;
    const user = {
        name: name,
        attributes: { ...defaultAttributes } // Later: load from backend or local
    };
    saveUser(user);
    window.location.href = "index.html";
}

function getUserLevel(attributes) {
    return Object.values(attributes).reduce((a, b) => a + b, 0);
}

function renderRadar(attributes) {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;
    const data = {
        labels: Object.keys(attributes),
        datasets: [{
            label: 'Attributes',
            data: Object.values(attributes),
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)'
        }]
    };
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            scales: {
                r: {
                    min: 0,
                    max: 10
                }
            }
        }
    });
}


function updateLeaderboard(currentUser) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard = leaderboard.filter(user => user.name !== currentUser.name);
    leaderboard.push({ name: currentUser.name, level: getUserLevel(currentUser.attributes) });
    leaderboard.sort((a, b) => b.level - a.level);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    const list = document.getElementById('leaderboardList');
    if (!list) return;
    list.innerHTML = "";
    leaderboard.forEach(user => {
        const li = document.createElement('li');
        li.innerText = `${user.name}: Level ${user.level}`;
        list.appendChild(li);
    });
}

function openAttributes() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    document.getElementById('attrInt').value = user.attributes.Intelligence;
    document.getElementById('attrKnow').value = user.attributes.Knowledge;
    document.getElementById('attrStr').value = user.attributes.Strength;
    document.getElementById('attrHlth').value = user.attributes.Health;

    document.getElementById('attributePanel').style.display = 'block';
}

function saveAttributes() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    user.attributes.Intelligence = parseInt(document.getElementById('attrInt').value);
    user.attributes.Knowledge = parseInt(document.getElementById('attrKnow').value);
    user.attributes.Strength = parseInt(document.getElementById('attrStr').value);
    user.attributes.Health = parseInt(document.getElementById('attrHlth').value);

    saveUser(user);
    location.reload();
}
