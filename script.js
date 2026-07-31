const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


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
    y: 300,
    speed: 5

};


// tasten

const keys = {};

window.addEventListener("keydown", (e) => {

    keys[e.key.toLowerCase()] = true;

});


window.addEventListener("keyup", (e) => {

    keys[e.key.toLowerCase()] = false;

});


// bewegung

function update() {


    if(keys["a"]) {

        player.x -= player.speed;

    }


    if(keys["d"]) {

        player.x += player.speed;

    }


}


// zeichnen

function draw() {


    // golden brown hintergrund

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



    // spieler körper

    ctx.fillStyle = "#777";

    ctx.fillRect(
        player.x,
        player.y,
        45,
        60
    );


    // kopf

    ctx.fillStyle = "#aaa";

    ctx.beginPath();

    ctx.arc(
        player.x + 22,
        player.y - 10,
        22,
        0,
        Math.PI * 2
    );

    ctx.fill();


}


// loop

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);

}


gameLoop();
