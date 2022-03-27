
const canvas = document.getElementById("pingpong");
//method returns a drawing context on the canvas
const context = canvas.getContext("2d");

// function to draw rectangle for all main function
function drawRect(x,y,w,h,col){
    context.fillStyle = col
    context.fillRect(x,y,w,h)
}

//draw board 
// function drawRect(x,y,w,h,col){
//     context.fillStyle = col
//     context.fillRect(x,y,w,h)
// }

// computer paddle {object}
const com = {
    x: canvas.width/2 - 50/2,
    y: 10,
    width: 50,
    height: 10,
    col: "white",
    score:0
}


// User Paddle {object}
const user = {
    x: canvas.width/2 - 50/2,
    y: canvas.height - 10,
    width: 50,
    height: 10,
    col: "white",
    score:0
}


// net 
function net(){
    context.beginPath();
context.setLineDash([10,5]);
context.moveTo(0, canvas.height/2);
context.lineTo(canvas.width,canvas.height/2);
context.stroke();
context.strokeWidth = 10
context.strokeStyle = "red"

}


// Draw a Circle
function drawCircle(x,y,r,col){
    context.fillStyle = col
    context.beginPath()
    context.arc(x,y,r,0,Math.PI*2)
    context.closePath()
    context.fill()
}

// Create a ball
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed:1,
    velocityX : 5,
    velocityY : 5,
    color: "white"
}


// scores
function drawText(text,x,y,color){
    context.fillStyle = color
    context.font = "3rem arial"
    context.fillText(text,x,y)
}



// for starting and renderng game 
function render(){

    // Make canvas
    drawRect(0,0,400,600,"black");
      // net
      net()

    // computer paddle
    drawRect(com.x,com.y,com.width,com.height,com.col)
    // user paddle
    drawRect(user.x,user.y,user.width,user.height,user.color)

  

    //create a ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color)

    // scores of com and user
    drawText(com.score,20,canvas.height/2 - 30)
    drawText(user.score,20,canvas.height/2  + 50)
}

// to control the user paddle
canvas.addEventListener("mousemove", movepaddle);
function movepaddle(e){
    let rect = canvas.getBoundingClientRect();
     user.x = e.clientX - rect.left ;
}

// collision detection
function collision(b,p){ //b==ball , p == player
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right > b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom;
}

// reset ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed = 1;
    // ball.velocityY = -ball.velocityY;
}

// Game over function
function ShowGameOver(){
    // Hide canvas
    canvas.style.display = "none";
    const can = document.getElementById("can");
    can.style.display = "none";
 
}

// update  speed og ball
function update(){
    ball.x += ball.velocityX*ball.speed;
    ball.y += ball.velocityY*ball.speed;

    // for sppeed of ball afteer collision with paddle
    let computerLevel = 0.1;
    com.x += (ball.x - (com.x + com.width/2)) + computerLevel;
    if(ball.speed > 2){
        com.x += ball.x + 1;
    }

    // return ball from wall colliosion speed
    if(ball.x + ball.radius > canvas.width || ball.x < 0){
        ball.velocityX = -ball.velocityX;
    }

    // if colliosion happen
    let player = (ball.y < canvas.height/2) ? com : user;
    if(collision(ball,player)){
        ball.velocityY = -ball.velocityY;
        ball.speed += 0.2;
    }

    // for score
    if(ball.y < 0){
        user.score++
        resetBall()
    }else if(ball.y  > canvas.height){
        com.score++;
        resetBall()
    }

    //Game over
    (user.score == 5 || com.score == 5) ? 
clearInterval(loop)
       && ShowGameOver(): ""
    }

//  start the game
function start(){
    update();
    render()
}

// for clearing score and restat game
const loop = setInterval(start, 1000/50);

