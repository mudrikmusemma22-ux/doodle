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
    y: 300,
    width: 40,
    height: 60,
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

// Spielschleife
function update() {

    if (keys["a"] || keys["arrowleft"]) {
        player.dx = -player.speed;
    } else if (keys["d"] || keys["arrowright"]) {
        player.dx = player.speed;
    } else {
        player.dx = 0;
    }

    player.x += player.dx;
}

function draw() {

    // Himmel
    ctx.fillStyle = "#f6f0d8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Boden
    ctx.fillStyle = "#7da86d";
    ctx.fillRect(0, canvas.height - 120, canvas.width, 120);

    // Doodle
    ctx.fillStyle = "#444";
    ctx.fillRect(
        player.x,
        canvas.height - 180,
        player.width,
        player.height
    );

    ctx.beginPath();
    ctx.arc(
        player.x + 20,
        canvas.height - 200,
        18,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
