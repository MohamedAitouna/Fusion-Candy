
var canvas=document.getElementById("renderCanvas");
var ctx=canvas.getContext("2d");

var lose=1;
var pause=1;

//paddle size
var paddleHeight=10;
var paddleWidth=45;
//coordinates of the paddle
var paddleX=(canvas.width-paddleWidth)/2;

//function for drawing the paddle
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
drawPaddle();

//coordinates of ball position
var x=20;
var y=60;
//Ball Radius
var ballRadius=10;
 
 
//small values define the speed of ball
var dx=2;
var dy=2;
//function for drawing a ball and will be executed within setInterval every x miliseconds
function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#00FB78";
	ctx.fill();
	ctx.closePath();	
}

//pressed buttons
var rightPressed=false;
var leftPressed=false;

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);


function keyDownHandler(e){
	if(e.keyCode==39){
		rightPressed=true;
	}else if(e.keyCode==37){
		leftPressed=true;
	}
}

function keyUpHandler(e){
	if(e.keyCode==39){
		rightPressed=false;
	}else if(e.keyCode==37){
		leftPressed=false;
	}	
}


//mouse buttons

document.addEventListener("mousemove",mouseMoveHandler,false);
function mouseMoveHandler(e){
	
	var relativeX=e.clientX-canvas.offsetLeft;
	//
	//console.log(e.clientY);
	if(e.clientY>10 && e.clientY<canvas.height+10){
		if(relativeX >0 && relativeX <canvas.width){
			paddleX=relativeX-paddleWidth/2;
			if(pause==0)
				pause=1;
		}else {
		
		pause=0;
		}
	}else{
		pause=0;
	}
}




function draw(){
	
	//drawing code
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	if(lose==1 && pause==1){
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
	}
	if(y + dy < ballRadius) {
    dy = -dy;
	}else if(y + dy > canvas.height-ballRadius){
		    if(x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
			}else{
			lose=0;
			}
	}
	x+=dx;
	y+=dy;
	}
	drawPaddle();
	if(rightPressed && paddleX+paddleWidth+7<canvas.width){
		ctx.clearRect(paddleX,canvas.height-paddleHeight,7,10);
		paddleX+=7;	
	}else if(leftPressed && paddleX-7>0){
		ctx.clearRect(paddleX+paddleWidth-6,canvas.height-paddleHeight,7,10);
		paddleX-=7;
	}
	
	requestAnimationFrame(draw);
}
draw();
