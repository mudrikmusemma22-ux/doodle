const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
alert("doodle code läuft");

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
    speed: 5,
    dx: 0
};


// Kamera

const camera = {
    x: 0
};


// Tasten

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});


// Schneeflocken

let snowflakes = [];

for (let i = 0; i < 100; i++) {

    snowflakes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5
    });

}


function drawSnow() {

    ctx.fillStyle = "#fff4dd";

    for (let snow of snowflakes) {

        ctx.beginPath();

        ctx.arc(
            snow.x,
            snow.y,
            snow.size,
            0,
            Math.PI * 2
        );

        ctx.fill();


        snow.y += snow.speed;


        if (snow.y > canvas.height) {
            snow.y = -5;
            snow.x = Math.random() * canvas.width;
        }

    }

}


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


    // Kamera folgt

    camera.x = player.x - 300;

}


// Wolken

function drawCloud(x, y, size) {

    ctx.fillStyle = "#f5ead2";

    ctx.beginPath();

    ctx.arc(x, y, size, 0, Math.PI * 2);

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


// Berge

function drawMountain(x, y, width, height) {

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


   
}// Schnee auf dem Berg (gemalter Stil)

ctx.fillStyle = "#fff4dd";

ctx.beginPath();

ctx.moveTo(
    x + width / 2,
    y - height
);

// linke Schneekante
ctx.lineTo(
    x + width / 2 - 80,
    y - height + 100
);

// kleine Welle
ctx.lineTo(
    x + width / 2 - 35,
    y - height + 80
);

// rechte Schneekante
ctx.lineTo(
    x + width / 2 + 70,
    y - height + 120
);

ctx.closePath();

ctx.fill();


// Zeichnen

function draw() {


    // Himmel

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


    // Wolken mit Kamera

    drawCloud(
        150 - camera.x * 0.2,
        120,
        30
    );

    drawCloud(
        600 - camera.x * 0.2,
        160,
        45
    );


    drawCloud(
        1000 - camera.x * 0.2,
        100,
        35
    );


    // Berge mit Kamera

    drawMountain(
        50 - camera.x,
        canvas.height - 120,
        500,
        250
    );


    drawMountain(
        650 - camera.x,
        canvas.height - 120,
        600,
        350
    );


    // Schnee Boden

    ctx.fillStyle = "#e8dfc8";

    ctx.fillRect(
        0,
        canvas.height - 120,
        canvas.width,
        120
    );



    // Doodle Ritter

    let x = player.x - camera.x;
    let y = canvas.height - 200;


    // Umhang

    ctx.fillStyle = "#7d3030";

    ctx.beginPath();

    ctx.moveTo(x + 5, y + 30);
    ctx.lineTo(x - 20, y + 90);
    ctx.lineTo(x + 15, y + 75);

    ctx.closePath();

    ctx.fill();



    // Rüstung

    ctx.fillStyle = "#777";

    ctx.fillRect(
        x,
        y + 35,
        40,
        50
    );



    // Helm

   // Helm

ctx.fillStyle = "#aaa";

ctx.beginPath();

ctx.arc(
    x + 20,
    y + 20,
    25,
    Math.PI,
    Math.PI * 2
);

ctx.fill();


// Helm seiten

ctx.fillRect(
    x - 5,
    y + 15,
    50,
    15
);


// Visier

ctx.fillStyle = "#333";

ctx.fillRect(
    x + 5,
    y + 20,
    30,
    6
);
    
    ctx.fill();
    
// Helm Rand (Buntstift-Linie)

ctx.strokeStyle = "#333";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.arc(
    x + 20,
    y + 20,
    22,
    0,
    Math.PI * 2
);

ctx.stroke();


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



    // Schnee

    drawSnow();


}


// Spielschleife

function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);

}


gameLoop();
