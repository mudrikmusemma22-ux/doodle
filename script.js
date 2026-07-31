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


    // Doodle (testfigur)
    ctx.fillStyle = "red";
    ctx.fillRect(
        player.x,
        canvas.height - 180,
        player.width,
        player.height
    );


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
