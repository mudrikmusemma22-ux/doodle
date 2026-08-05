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

let snowGrounds = [];

for(let i = 0; i < 9; i++){

    snowGrounds.push({
        x: i * 800,
        w: 800,
        hills: createSnowHills()
    });

}


function createSnowHills(){

    let hills = [];

    for(let x = 0; x <= 800; x += 40){

        hills.push(Math.random() * 15);

    }

    return hills;

}

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

// ===== helm =====

// metall
ctx.fillStyle = "#cfd4d8";

ctx.beginPath();
ctx.moveTo(x + 8, y + 18);
ctx.quadraticCurveTo(x + 22, y + 2, x + 36, y + 18);
ctx.lineTo(x + 42, y + 28);
ctx.lineTo(x + 42, y + 58);
ctx.quadraticCurveTo(x + 22, y + 76, x + 2, y + 58);
ctx.lineTo(x + 2, y + 28);
ctx.closePath();
ctx.fill();


// rechte schattierung
ctx.fillStyle = "#9aa2a8";

ctx.beginPath();
ctx.moveTo(x + 22, y + 8);
ctx.quadraticCurveTo(x + 36, y + 14, x + 42, y + 28);
ctx.lineTo(x + 42, y + 58);
ctx.quadraticCurveTo(x + 32, y + 70, x + 22, y + 72);
ctx.closePath();
ctx.fill();


// outline
ctx.strokeStyle = "#ffffff";
ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(x + 8, y + 18);
ctx.quadraticCurveTo(x + 22, y + 2, x + 36, y + 18);
ctx.lineTo(x + 42, y + 28);
ctx.lineTo(x + 42, y + 58);
ctx.quadraticCurveTo(x + 22, y + 76, x + 2, y + 58);
ctx.lineTo(x + 2, y + 28);
ctx.closePath();
ctx.stroke();


// visier
ctx.fillStyle = "#202020";

ctx.beginPath();
ctx.roundRect(
    x + 8,
    y + 30,
    28,
    12,
    3
);
ctx.fill();


// schlitze
ctx.strokeStyle = "#7f8790";
ctx.lineWidth = 1.5;

for(let i = 0; i < 4; i++){

    let sx = x + 13 + i * 5;

    ctx.beginPath();
    ctx.moveTo(sx, y + 32);
    ctx.lineTo(sx, y + 40);
    ctx.stroke();

}


// glanz
ctx.fillStyle = "#ffffff";

ctx.beginPath();
ctx.arc(
    x + 12,
    y + 16,
    3,
    0,
    Math.PI * 2
);
// ===== schwert =====

ctx.save();

ctx.translate(x + 52, y + 87);
ctx.rotate(-0.85);

// klinge
ctx.fillStyle = "#dfe6eb";
ctx.fillRect(0, -5, 78, 10);

// spitze
ctx.beginPath();
ctx.moveTo(78, -5);
ctx.lineTo(92, 0);
ctx.lineTo(78, 5);
ctx.closePath();
ctx.fill();

// parierstange
ctx.restore();

ctx.strokeStyle = "#e6b83f";
ctx.lineWidth = 7;
ctx.lineCap = "round";

ctx.beginPath();
ctx.moveTo(x + 42, y + 87);
ctx.lineTo(x + 63, y + 87);
ctx.stroke();


// griff
ctx.strokeStyle = "#5b351c";
ctx.lineWidth = 7;

ctx.beginPath();
ctx.moveTo(x + 52, y + 87);
ctx.lineTo(x + 42, y + 98);
ctx.stroke();


// knauf
ctx.fillStyle = "#ffd34e";

ctx.beginPath();
ctx.arc(x + 39, y + 101, 4, 0, Math.PI * 2);
ctx.fill();

    
    
// ===== beine =====

let legMove = Math.sin(player.walkTime) * 8;


// linkes bein

ctx.strokeStyle = "#555";
ctx.lineWidth = 8;
ctx.lineCap = "round";

ctx.beginPath();

ctx.moveTo(
    x + 12,
    y + 105
);

ctx.lineTo(
    x + 12 + legMove,
    y + 145
);

ctx.stroke();


// rechtes bein

ctx.beginPath();

ctx.moveTo(
    x + 33,
    y + 105
);

ctx.lineTo(
    x + 33 - legMove,
    y + 145
);

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

    
   // schnee loop

for (let ground of snowGrounds) {
    
    // nach rechts
    if (ground.x - camera.x < -ground.w) {

        let farthest = Math.max(...snowGrounds.map(s => s.x));

        ground.x = farthest + ground.w;
        ground.hills = createSnowHills();

    }

    if (ground.x - camera.x > canvas.width + ground.w) {

    let smallest = Math.min(...snowGrounds.map(s => s.x));

    ground.x = smallest - ground.w;
    ground.hills = createSnowHills();

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

let hills = [];

for (let x = 0; x <= 4000; x += 40) {
    hills.push(Math.random() * 15);
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
    
  // schnee boden loop

for(let ground of snowGrounds){

    ctx.fillStyle = "#fffdf8";

    ctx.beginPath();

    ctx.moveTo(
        ground.x - camera.x,
        canvas.height - 120
    );


    for(let i = 0; i < ground.hills.length; i++){

        ctx.lineTo(
            ground.x + i * 40 - camera.x,
            canvas.height - 120 - ground.hills[i]
        );

    }


    ctx.lineTo(
        ground.x + ground.w - camera.x,
        canvas.height
    );

    ctx.lineTo(
        ground.x - camera.x,
        canvas.height
    );


    ctx.closePath();
    ctx.fill();

}



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
