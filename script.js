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
    height: 60,
    speed: 5,
    dx: 0
};


// Tasten speichern
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

    // golden-brown Himmel
    let sky = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    sky.addColorStop(0, "#b88a52");
    sky.addColorStop(0.5, "#d7b27b");
    sky.addColorStop(1, "#f2e6c8");

    ctx.fillStyle = sky;
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Boden
    ctx.fillStyle = "#d8d0bb";
    ctx.fillRect(
        0,
        canvas.height - 120,
        canvas.width,
        120
    );


    // Doodle der Ritter

let doodleX = player.x;
let doodleY = canvas.height - 180;

// umhang
ctx.fillStyle = "#7a2f35";
ctx.beginPath();
ctx.moveTo(doodleX + 5, doodleY + 30);
ctx.lineTo(doodleX - 20, doodleY + 70);
ctx.lineTo(doodleX + 10, doodleY + 80);
ctx.closePath();
ctx.fill();

// körper / rüstung
ctx.fillStyle = "#777";
ctx.fillRect(
    doodleX,
    doodleY + 35,
    35,
    45
);

// helm
ctx.fillStyle = "#aaa";
ctx.beginPath();
ctx.arc(
    doodleX + 18,
    doodleY + 20,
    18,
    0,
    Math.PI * 2
);
ctx.fill();

// visier
ctx.fillStyle = "#333";
ctx.fillRect(
    doodleX + 5,
    doodleY + 18,
    25,
    5
);

// schwert
ctx.strokeStyle = "#222";
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(
    doodleX + 35,
    doodleY + 45
);
ctx.lineTo(
    doodleX + 65,
    doodleY + 15
);
ctx.stroke();
// Schwert
ctx.strokeStyle = "#222";
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(
    doodleX + 40,
    doodleY + 35
);
ctx.lineTo(
    doodleX + 60,
    doodleY + 10
);
ctx.stroke();


    // Position anzeigen
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(
        "doodle position: " + Math.floor(player.x),
        20,
        40
    );
}


// Spiel starten
function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
