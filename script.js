const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

canvas.width = 450;
canvas.height = 400;

let counter = 0;

//Variables pelota
const ballRadius = 3;
let x = canvas.width / 2;  //posicion de la pelota
let y = canvas.height - 30;
//velocidad pelota
let dx = 4;  //eje horizontal
let dy = -4; //eje vertical

//variables plataforma
const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

//movimiento plataforma
let rigthPressed = false;
let leftPressed = false;

//Bricks
const brickRowCount = 6;
const brickColumnCount = 12;
const brickWidth = 32;
const brickHeight = 16;
const brickPadding = 0;
const brickOffsetTop = 50;
const brickOffsetLeft = 35;
const bricks = [];

const brick_status = {
    active: 1,
    broken: 0,

}


//c = columna, r = rows
for (let c = 0; c < brickColumnCount; c++){
    //inicializar con array vacio
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++){
        //calculo de la posicion de los ladrillos en la pantalla
       const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
       const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

       //colores bricks
       const randomColor = Math.floor(Math.random() * 8);


       //Guardar las posiciones de los ladrillos
       bricks[c][r] = 
       {x: brickX, 
        y: brickY, 
        status: brick_status.active, 
        color: randomColor
    };
    }
}

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

function drawBricks(){
    for (let c = 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowCount; r++){
            //recupero el brick actual
            const currentBrick = bricks[c][r];

            if (currentBrick.status === brick_status.broken) 
                continue;

            
            const clipX = currentBrick.color * 32;

            ctx.drawImage(
                $bricks,
                clipX,
                0,
                31,
                16,
                currentBrick.x,
                currentBrick.y,
                brickWidth,
                brickHeight
            )
        }
    }
}   


function collisionDetection(){
    for (let c = 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowCount; r++){
            const currentBrick = bricks[c][r];
            if (currentBrick.status === brick_status.broken) 
               continue;

                const sobreLaPlataformaEnX = 
                x > currentBrick.x && 
                x < currentBrick.x + brickWidth

                const encimaDeLaPlataforma = 
                y + dy > currentBrick.y && 
                y + dy < currentBrick.y + brickHeight

                if( sobreLaPlataformaEnX && encimaDeLaPlataforma){
                    dy = -dy;
                    currentBrick.status = brick_status.broken;
            }
        }
    }
}

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
    const encimaDeLaPlataforma = (y + dy > paddleY);

    // Verificio si la pelota está sobre la plataforma en eje X
    const sobreLaPlataformaEnX = (x > paddleX && x < paddleX + paddleWidth);

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