const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

ctx.fillStyle = "#6aa84f";
ctx.fillRect(0, canvas.height - 120, canvas.width, 120);

ctx.fillStyle = "#444";
ctx.fillRect(100, canvas.height - 180, 40, 60);

ctx.fillStyle = "#222";
ctx.beginPath();
ctx.arc(120, canvas.height - 200, 18, 0, Math.PI * 2);
ctx.fill();
