const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Bildschirmgröße
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


// Spieler
const player = {
    x: 100,
    width: 40,
    height: 80,
    speed: 5,
    dx: 0
};


// Tasten
const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});


// Bewegung
function update() {

    player.dx = 0;

    if (keys["a"] || keys["arrowleft"]) {
        player.dx = -player.speed;
    }

    if (keys["d"] || keys["arrowright"]) {
        player.dx = player.speed;
    }

    player.x += player.dx;
}


// Zeichnen
function draw() {

    // golden brown Himmel
    let sky = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    sky.addColorStop(0, "#a87545");
    sky.addColorStop(0.5, "#d2a66c");
    sky.addColorStop(1, "#f0dfbd");

    ctx.fillStyle = sky;
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


   // Wolken (gemalter Stil)

function drawCloud(x, y, size) {

    ctx.fillStyle = "#f5ead2";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        size,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + size,
        y - 10,
        size * 1.2,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + size * 2,
        y,
        size,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// wolken am himmel

drawCloud(200, 120, 30);
drawCloud(600, 180, 45);
drawCloud(1000, 100, 35);

    
    // Berge (gemalter Stil)

function drawMountain(x, y, width, height) {

    // Berg
    ctx.fillStyle = "#b8a58a";

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
        x + width / 2,
        y - height
    );
    ctx.lineTo(
        x + width,
        y
    );
    ctx.closePath();
    ctx.fill();


    // Schnee auf der Spitze
    ctx.fillStyle = "#fff4dd";

    ctx.beginPath();
    ctx.moveTo(
        x + width / 2,
        y - height
    );
    ctx.lineTo(
        x + width / 2 - 40,
        y - height + 60
    );
    ctx.lineTo(
        x + width / 2 + 40,
        y - height + 60
    );
    ctx.closePath();

    ctx.fill();
}


// hintergrund berge

drawMountain(
    100,
    canvas.height - 120,
    500,
    300
);

drawMountain(
    700,
    canvas.height - 120,
    600,
    400
);
    // Doodle Ritter

    let x = player.x;
    let y = canvas.height - 180;


    // Umhang
    ctx.fillStyle = "#7d3030";
    ctx.beginPath();
    ctx.moveTo(x + 5, y + 30);
    ctx.lineTo(x - 25, y + 85);
    ctx.lineTo(x + 15, y + 75);
    ctx.closePath();
    ctx.fill();


    // Rüstung
    ctx.fillStyle = "#777";
    ctx.fillRect(
        x,
        y + 35,
        40,
        45
    );


    // Helm
    ctx.fillStyle = "#aaa";
    ctx.beginPath();
    ctx.arc(
        x + 20,
        y + 25,
        22,
        0,
        Math.PI * 2
    );
    ctx.fill();


    // Visier
    ctx.fillStyle = "#333";
    ctx.fillRect(
        x + 5,
        y + 20,
        30,
        6
    );


    // Schwert
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(
        x + 40,
        y + 55
    );
    ctx.lineTo(
        x + 70,
        y + 20
    );
    ctx.stroke();


    // Position
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(
        "doodle x: " + Math.floor(player.x),
        20,
        40
    );
}


// Spielschleife
function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}


gameLoop();
