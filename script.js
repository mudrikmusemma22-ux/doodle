const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


// spieler

const player = {
    x: 300,
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


// schnee

let snowflakes = [];

for (let i = 0; i < 40; i++) {

    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speed: Math.random() + 0.5
    });

}


function drawSnow() {

    ctx.fillStyle = "#fff4dd";

    snowflakes.forEach(s => {

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
            s.y = -10;
        }

    });

}


// wolken

function drawCloud(x,y,size){

    ctx.fillStyle="#f5ead2";

    ctx.beginPath();

    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.arc(x+size,y-10,size*1.2,0,Math.PI*2);
    ctx.arc(x+size*2,y,size,0,Math.PI*2);

    ctx.fill();

}



// berge

function drawMountain(x,y,w,h){

    ctx.fillStyle="#b39a7a";

    ctx.beginPath();

    ctx.moveTo(x,y);

    ctx.lineTo(
        x+w/2,
        y-h
    );

    ctx.lineTo(
        x+w,
        y
    );

    ctx.closePath();

    ctx.fill();



    // bergschnee

    ctx.fillStyle="#fff4dd";

    ctx.beginPath();

    ctx.moveTo(
        x+w/2,
        y-h
    );

    ctx.lineTo(
        x+w/2-80,
        y-h+100
    );

    ctx.lineTo(
        x+w/2-20,
        y-h+70
    );

    ctx.lineTo(
        x+w/2+40,
        y-h+120
    );

    ctx.lineTo(
        x+w/2+80,
        y-h+90
    );

    ctx.closePath();

    ctx.fill();

}


// doodle

function drawDoodle(){

    let x = player.x;
    let y = canvas.height-230;


    // umhang

    ctx.fillStyle="#7d3030";

    ctx.beginPath();

    ctx.moveTo(x,y+40);
    ctx.lineTo(x-25,y+100);
    ctx.lineTo(x+20,y+90);

    ctx.closePath();

    ctx.fill();



    // rüstung

    ctx.fillStyle="#777";

    ctx.fillRect(
        x,
        y+50,
        45,
        55
    );



    // helm

    ctx.fillStyle="#aaa";

    ctx.beginPath();

    ctx.arc(
        x+22,
        y+35,
        27,
        0,
        Math.PI*2
    );

    ctx.fill();


    // helm rand

    ctx.strokeStyle="#333";
    ctx.lineWidth=3;

    ctx.stroke();



    // visier

    ctx.fillStyle="#333";

    ctx.fillRect(
        x-5,
        y+30,
        50,
        8
    );


    // schwert

    ctx.strokeStyle="#222";
    ctx.lineWidth=5;

    ctx.beginPath();

    ctx.moveTo(
        x+45,
        y+70
    );

    ctx.lineTo(
        x+85,
        y+20
    );

    ctx.stroke();

}



// buntstift effekt

function pencilTexture(){

    for(let i=0;i<250;i++){

        ctx.strokeStyle="rgba(80,60,40,0.08)";

        ctx.beginPath();

        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height;

        ctx.moveTo(x,y);

        ctx.lineTo(
            x+10,
            y+10
        );

        ctx.stroke();

    }

}



// update

function update(){

    player.dx=0;

    if(keys["a"]){
        player.dx=-player.speed;
    }

    if(keys["d"]){
        player.dx=player.speed;
    }


    player.x+=player.dx;

}



// zeichnen

function draw(){


    let sky=ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    sky.addColorStop(0,"#a87545");
    sky.addColorStop(1,"#f0dfbd");


    ctx.fillStyle=sky;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    drawCloud(150,130,35);
    drawCloud(700,170,45);


    drawMountain(
        100,
        canvas.height-120,
        500,
        300
    );


    drawMountain(
        800,
        canvas.height-120,
        600,
        400
    );



    ctx.fillStyle="#e8dfc8";

    ctx.fillRect(
        0,
        canvas.height-120,
        canvas.width,
        120
    );


    drawDoodle();

    drawSnow();

    pencilTexture();

}



// loop

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(gameLoop);

}


gameLoop();
