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
// For attributes.html only
if (document.getElementById("attributeRadar")) {
    const ctx = document.getElementById("attributeRadar").getContext("2d");
    const user = JSON.parse(localStorage.getItem("user"));

    const attributes = user?.attributes || {
        Intelligence: 0,
        Knowledge: 0,
        Strength: 0,
        Health: 0
    };

    document.getElementById("intelligence").value = attributes.Intelligence;
    document.getElementById("knowledge").value = attributes.Knowledge;
    document.getElementById("strength").value = attributes.Strength;
    document.getElementById("health").value = attributes.Health;

    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(attributes),
            datasets: [{
                label: 'User Stats',
                data: Object.values(attributes),
                backgroundColor: 'rgba(46, 204, 113, 0.4)',
                borderColor: 'rgba(39, 174, 96, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

function goBack() {
    window.location.href = "index.html";
}

function saveAttributes() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    user.attributes.Intelligence = parseInt(document.getElementById("intelligence").value);
    user.attributes.Knowledge = parseInt(document.getElementById("knowledge").value);
    user.attributes.Strength = parseInt(document.getElementById("strength").value);
    user.attributes.Health = parseInt(document.getElementById("health").value);

    localStorage.setItem("user", JSON.stringify(user));
    alert("Attributes saved!");

    // Reload chart with new data
    location.reload();
}

