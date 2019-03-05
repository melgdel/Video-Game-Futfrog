var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



function drawGoalie (){
  var img = new Image();
  imgScale = 440/800;
  img.onload = function() {
  ctx.drawImage(img, 100, 350,90*imgScale,60);
  };
  img.src = 'images/goalie.png';

}

//grass

function imagesGrass(){

var img = new Image();
imgScale = 440/800;
img.onload = function() {
ctx.drawImage(img, 0, 440,1450*imgScale,45);
};
img.src = 'images/grass.png';
ctx.fillStyle = "green";

var img = new Image();
imgScale = 440/800;
img.onload = function() {
ctx.drawImage(img, 0, 220,1450*imgScale,45);
};
img.src = 'images/grass.png';
ctx.fillStyle = "green";

}

function imagesLog(){
  ctx.fillStyle ="tan";
  ctx.fillRect (logX1, logY1, logWidth, logHeight);

  /*var logX1 = 300;
  var logY1 = 180 ;
  var logWidth = 120;
  var logHeight = 30;*/

}
  var img = new Image();
  imgScale = 440/800;
  img.onload = function() {
  ctx.drawImage(img, 200, 180,120*imgScale,30);
  };
  img.src = 'images/log.png';


  /*var img = new Image();
  imgScale = 440/800;
  img.onload = function() {
  ctx.drawImage(img, 300, 180,120*imgScale,30);
  };
  img.src = 'images/log.png'*/

function draw(){
 ctx.clearRect (0,0, canvas.width, canvas.height);
  drawGoalie();
  imagesGrass();
  imagesLog();

  requestAnimationFrame(draw);
}

draw () ;