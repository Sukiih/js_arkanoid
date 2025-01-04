const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const sprite = document.querySelector("#sprite");
const bricks = document.querySelector("#bricks");

canvas.width = 450;
canvas.height = 400;

let counter = 0;

//Variables pelota
const ballRadius = 3;
let x = canvas.width / 2;  //posicion de la pelota
let y = canvas.height - 30;
//velocidad pelota
let dx = 2;  //eje horizontal
let dy = -2; //eje vertical

//variables plataforma
const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

//movimiento plataforma
let rigthPressed = false;
let leftPressed = false;

const paddleSensitivity = 7;

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){

    ctx.drawImage(
        sprite, //img
        29,   //clipX: coordenadas de recorte
        174,  //clipY: coordenadas de recorte
        paddleWidth,  //tamaño de recorte
        paddleHeight,
        paddleX,   //posicion X del dibujo
        paddleY,   //posicion Y del dibujo
        paddleWidth,  //ancho del dibujo
        paddleHeight  //alto del dibujo
    )
}

function drawBricks(){}


function collisionDetection(){}

function ballMovement(){
    //rebotar pelota en los laterales
    if(
        x + dx > canvas.width - ballRadius || //parte derecha
        x + dx < ballRadius //parte izquierda
    ){
        dx = -dx
    }

    //rebotar pelota parte superior
    if(y + dy < ballRadius){ //parte superior
        dy = -dy
    }

    //si la pelota toca la plataforma

    // verificar si la pelota esta encima de la plataforma en eje Y
    let encimaDeLaPlataforma = (y + dy > paddleY);

    // Verificio si la pelota está sobre la plataforma en eje X
    let sobreLaPlataformaEnX = (x > paddleX && x < paddleX + paddleWidth);

    if (encimaDeLaPlataforma && sobreLaPlataformaEnX){
        dy = -dy;
    }

    //si la pelota toca el suelo
    else if (y + dy > canvas.height - ballRadius){ 
        console.log("Perdiste");
        document.location.reload(); 
    }


    x += dx;
    y += dy;
}

function paddleMovement(){
    if (rigthPressed && paddleX < canvas.width - paddleWidth){
        paddleX += paddleSensitivity;
    } else if (leftPressed && paddleX > 0){
        paddleX -= paddleSensitivity;
    }
}

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents (){
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    function keyDownHandler(event){
        const {key} = event;

        if(key === "Right" || key === "ArrowRight"){
            rigthPressed = true;
        }else if(key === "Left" || key === "ArrowLeft"){
            leftPressed = true;
        }
    }

    function keyUpHandler(event){
        const {key} = event;

        if(key === "Right" || key === "ArrowRight"){
            rigthPressed = false;
        }else if(key === "Left" || key === "ArrowLeft"){
            leftPressed = false;
        }
    }
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
initEvents();