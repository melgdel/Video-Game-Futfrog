

window.addEventListener("keypress", getKeyAndMove, false)


var frog = new Image(); 
frog.src = "images/messifrog.png"

var x = 0;
var y = 420;
var width = 80 ;
var height = 65 ;

/*
//Movement 
function getKeyAndMove(e){				
  

  var keyPressed = e.which || e.keyCode;
  console.log("key captured "+ keyPressed);

  if (37 == keyPressed) {
    console.log("left");
  }

  switch(keyPressed){
    case 37: //left arrow key
      moveLeft();
      break;
    case 119: //Up arrow key
      moveUp();
      break;
    case 39: //right arrow key
      moveRight();
      break;
    case 40: //down arrow key
      moveDown();
      break;					
  }
}

function moveLeft(){
  console.log("left from my case");
}
function moveRigth(){
  console.log("Right from my case");

}
function moveUp(){
  console.log("Up from my case");
  //movement
  if (y > 20){
    y = y - 20;
     ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
  }
}
function moveDown(){
  console.log("Down from my case");
}
*/

function drawfrog(){
  ctx.drawImage(frog,x,y,width,height);
}

function draw (){
  ctx.clearRect (0,0, canvas.width, canvas.height);
  requestAnimationFrame(drawfrog);
}
