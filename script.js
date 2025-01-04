const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 450;
canvas.height = 400;

let counter = 0;

//Variables bolita
const ballRadius = 3;
let x = canvas.width / 2;  //posicion de la bolita
let y = canvas.height - 30;
//velocidad bolita
let dx = 2;  //eje horizontal
let dy = -2; //eje vertical


function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();  //optimizamos rendimiento
}

function drawPaddle(){}

function drawBricks(){}


function collisionDetection(){}

function ballMovement(){
    x += dx;
    y += dy;
}

function paddleMovement(){}

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function draw (){
    cleanCanvas();
//dibujo de elementos
    drawBall();
    drawPaddle();
    drawBricks();

//score


//coliciones y movimientos
    collisionDetection();
    ballMovement();
    paddleMovement();
    window.requestAnimationFrame(draw);
}

draw();