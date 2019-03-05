



function drawBackground (){

  

//dashed horizontal line 

ctx.beginPath();
ctx.moveTo(0,395);
ctx.lineTo (800,395);
ctx.strokeStyle ="white";
ctx.setLineDash([20]);
ctx.strokeWidth = 5;
ctx.stroke();

//street marking 
ctx.beginPath();
ctx.moveTo(0,350);
ctx.lineTo (800,350);
ctx.strokeStyle = "white";
ctx.setLineDash([2]);
ctx.strokeWidth = 10;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,305);
ctx.lineTo (800,305);
ctx.strokeStyle ="white";
ctx.setLineDash([20]);
ctx.strokeWidth = 5;
ctx.stroke();

//drawing water 
ctx.fillStyle = "lightblue";
ctx.fillRect (0,0,800,220);



//function drawPads(){
  //ctx.fillStyle = "seagreen"
  //var padsx = [padx1,padx2,padx3,padx4,padx5,padx6];
  //var padsy = [pady1,pady2,pady3,pady4,pady5,pady6];

  //for (i = 0;i < padsx.length; i++){
   //ctx.fillRect(padsx[i],padsy[i],padWith,padHeight);
  
  //}
//}

}

function draw (){
  ctx.clearRect (0,0, canvas.width, canvas.height);
  drawBackground();
  drawGoalie();
     imagesGrass();
     imagesLog();
     drawfrog (); 
     drawBackground (); 
   
     requestAnimationFrame(draw);
   }
   
   draw () ;

