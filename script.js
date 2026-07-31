const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// kamera

const camera = {
    x: 0
};

// größe

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


// spieler

const player = {
    x: 300,
    worldX: 300,
    speed: 5,
    dx: 0
};


// tasten

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

// pinsel

let brush = false;

let drawings = [];


let mouse = {
    x: 0,
    y: 0,
    down: false
};


// maus bewegen

canvas.addEventListener("mousemove", (e) => {

    let rect = canvas.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

});


// maus drücken

canvas.addEventListener("mousedown", () => {

    mouse.down = true;

});


// maus loslassen

canvas.addEventListener("mouseup", () => {

    mouse.down = false;

});


// pinsel auswählen

window.addEventListener("keydown", (e) => {

    if(e.key === "1"){

        brush = true;

    }

});

// schnee

let snowflakes = [];

for (let i = 0; i < 30; i++) {

    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speed: 0.5 + Math.random()
    });

}


function drawSnow() {

    ctx.fillStyle = "#fff4dd";

    for (let s of snowflakes) {

        ctx.beginPath();

        ctx.arc(
            s.x,
            s.y,
            s.size,
            0,
            Math.PI * 2
        );

        ctx.fill();


        s.y += s.speed;


        if (s.y > canvas.height) {
            s.y = -5;
        }

    }

}


// wolken

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



// berge

function drawMountain(x, y, w, h) {

    ctx.fillStyle = "#b39a7a";

    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.lineTo(
        x + w / 2,
        y - h
    );

    ctx.lineTo(
        x + w,
        y
    );

    ctx.closePath();

    ctx.fill();


    // schnee

    ctx.fillStyle = "#fff4dd";

    ctx.beginPath();

    ctx.moveTo(
        x + w / 2,
        y - h
    );

    ctx.lineTo(
        x + w / 2 - 70,
        y - h + 90
    );

    ctx.lineTo(
        x + w / 2,
        y - h + 60
    );

    ctx.lineTo(
        x + w / 2 + 70,
        y - h + 100
    );

    ctx.closePath();

    ctx.fill();

}



// doodle ritter

function drawDoodle() {

    let x = player.x;
    let y = canvas.height - 230;


    // umhang

    ctx.fillStyle = "#7d3030";

    ctx.beginPath();

    ctx.moveTo(x, y + 50);
    ctx.lineTo(x - 25, y + 110);
    ctx.lineTo(x + 25, y + 90);

    ctx.closePath();

    ctx.fill();



    // rüstung

    ctx.fillStyle = "#777";

    ctx.fillRect(
        x,
        y + 50,
        45,
        55
    );



    // helm

    ctx.fillStyle = "#aaa";

    ctx.beginPath();

    ctx.arc(
        x + 22,
        y + 35,
        27,
        0,
        Math.PI * 2
    );

    ctx.fill();



    // visier

    ctx.fillStyle = "#333";

    ctx.fillRect(
        x - 5,
        y + 30,
        50,
        8
    );



    // schwert

    ctx.strokeStyle = "#222";

    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(
        x + 45,
        y + 70
    );

    ctx.lineTo(
        x + 85,
        y + 20
    );

    ctx.stroke();

}



// bewegung

function update() {

    player.dx = 0;


    if (keys["a"]) {
        player.dx = -player.speed;
    }


    if (keys["d"]) {
        player.dx = player.speed;
    }


    player.worldX += player.dx;  camera.x = player.worldX - canvas.width / 2;

}

function drawBrush(){

    if(mouse.down && brush){

        drawings.push({

            x: mouse.x,
            y: mouse.y,
            size: Math.random() * 4 + 3

        });

    }


    for(let d of drawings){

        // hauptstrich

        ctx.fillStyle = "rgba(190,40,40,0.7)";

        ctx.beginPath();

        ctx.arc(
            d.x,
            d.y,
            d.size,
            0,
            Math.PI * 2
        );

        ctx.fill();



        // kleine buntstift kratzer

        ctx.strokeStyle = "rgba(120,20,20,0.35)";
        ctx.lineWidth = 1;


        ctx.beginPath();

        ctx.moveTo(
            d.x - 4,
            d.y - 4
        );


        ctx.lineTo(
            d.x + 6,
            d.y + 5
        );


        ctx.stroke();

    }

}



// zeichnen

function draw(){

    ctx.fillStyle = "#222";
    ctx.font = "20px Arial";
    ctx.fillText("Doodle läuft!", 20, 30);

    // rest vom code
    
    // golden brown himmel

    let sky = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );


    sky.addColorStop(0, "#a87545");
    sky.addColorStop(1, "#f0dfbd");


    ctx.fillStyle = sky;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    // wolken

    drawCloud(150,120,35);
    drawCloud(700,170,45);



    // berge

   drawMountain(
    100,
    canvas.height - 120,
    500,
    300
);


drawMountain(
    800,
    canvas.height - 120,
    600,
    400
);


drawMountain(
    1500,
    canvas.height - 120,
    700,
    450
);


drawMountain(
    2400,
    canvas.height - 120,
    800,
    500
);


    // boden

    ctx.fillStyle = "#e8dfc8";

    ctx.fillRect(
        0,
        canvas.height - 120,
        canvas.width,
        120
    );


drawDoodle();

drawSnow();

drawBrush();

}


// spiel

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);

}


gameLoop();
