const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// kamera

const camera = {
    x: 0
};


// berge für den loop

const mountains = [
    {x: 100, w: 500, h: 300},
    {x: 800, w: 600, h: 400},
    {x: 1500, w: 700, h: 450},
    {x: 2400, w: 800, h: 500}
];


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
    dx: 0,
    walkTime: 0
};  

// tasten test

const keys = {};

window.addEventListener("keydown", (e) => {

    console.log("gedrückt:", e.key);

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



/// doodle ritter

alert("neuer doodle code");

function drawDoodle(){

   let x = canvas.width / 2;
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


// =======================
// HELM
// =======================

// haupthelm
ctx.fillStyle = "#cfd3d7";

ctx.beginPath();
ctx.moveTo(x + 6, y + 18);
ctx.quadraticCurveTo(x + 22, y - 6, x + 39, y + 18);
ctx.lineTo(x + 45, y + 28);
ctx.lineTo(x + 45, y + 56);
ctx.quadraticCurveTo(x + 22, y + 78, x, y + 56);
ctx.lineTo(x, y + 28);
ctx.closePath();
ctx.fill();

// metallrand
ctx.strokeStyle = "#f5f5f5";
ctx.lineWidth = 2;
ctx.stroke();


// rechter schatten
ctx.fillStyle = "#9aa0a6";

ctx.beginPath();
ctx.moveTo(x + 23, y + 6);
ctx.lineTo(x + 45, y + 28);
ctx.lineTo(x + 45, y + 56);
ctx.quadraticCurveTo(x + 35, y + 70, x + 23, y + 74);
ctx.closePath();
ctx.fill();


// visier
ctx.fillStyle = "#303236";

ctx.beginPath();
ctx.moveTo(x + 6, y + 31);
ctx.lineTo(x + 39, y + 31);
ctx.lineTo(x + 36, y + 46);
ctx.lineTo(x + 9, y + 46);
ctx.closePath();
ctx.fill();


// schlitze
ctx.strokeStyle = "#b8bec4";
ctx.lineWidth = 1.5;

for(let i = 0; i < 4; i++){

    let sx = x + 11 + i * 6;

    ctx.beginPath();
    ctx.moveTo(sx, y + 33);
    ctx.lineTo(sx, y + 44);
    ctx.stroke();

}


// glanz
ctx.fillStyle = "#ffffff";

ctx.beginPath();
ctx.arc(
    x + 11,
    y + 16,
    3,
    0,
    Math.PI * 2
);

ctx.fill();

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


// beine

let legMove = Math.sin(player.walkTime) * 8;

ctx.strokeStyle = "#555";
ctx.lineWidth = 8;
ctx.lineCap = "round";

ctx.beginPath();
ctx.moveTo(x + 12, y + 105);
ctx.lineTo(x + 12 + legMove, y + 145);
ctx.stroke();


ctx.beginPath();
ctx.moveTo(x + 33, y + 105);
ctx.lineTo(x + 33 - legMove, y + 145);
ctx.stroke();

}


// bewegung

function update(){

    if(keys["a"]){
        player.x -= player.speed;
    }

    if(keys["d"]){
        player.x += player.speed;
    }

    camera.x = player.x - canvas.width / 2;

// berg loop
    
for(let m of mountains){

    if(m.x - camera.x < -800){

        let farthest = Math.max(...mountains.map(b => b.x + b.w));
        m.x = farthest + 200;

    }

}
    
    if(keys["a"] || keys["d"]){
        player.walkTime += 0.2;
    }else{
        player.walkTime = 0;
    }

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

for(let m of mountains){

    drawMountain(
        m.x - camera.x,
        canvas.height - 120,
        m.w,
        m.h
    );

}
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
