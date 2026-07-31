const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// größe

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

// spiel

function update() {

}

function draw() {

    // hintergrund
    ctx.fillStyle = "#f2e5c5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // test
    ctx.fillStyle = "#222";
    ctx.font = "28px Arial";
    ctx.fillText("doodle engine v2", 30, 50);

}

function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();
