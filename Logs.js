/* gets the page canvas, checks for context, and runs the game */
function init_game() {
	canvas = document.getElementById ('game');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		rungame(ctx);
	}
	
}

// initializes log positions and speeds 
function init_logs() {
	vars.log = new Array();
	vars.log[0] = {};
	vars.
	
	
	log[0].pX = 180;		//1 goes left
	vars.log[0].pY = 252;
	vars.log[0].loglen = 85;
	vars.log[0].speed = -0.9;
	vars.log[1] = {};
	vars.log[1].loglen = 178;
	vars.log[1].pX = 250;		//ROW 2 goes right
	vars.log[1].pY = 218;
	vars.log[1].speed = 1.8;
	vars.log[2] = {};
	vars.log[2].loglen = 117;
	vars.log[2].pX = 300;		//ROW 3 goes left
	vars.log[2].pY = 184;
	vars.log[2].speed = -1.2;
	vars.log[3] = {};
	vars.log[3].loglen = 85;
	vars.log[3].pX = 170;		//ROW 4 goes right
	vars.log[3].pY = 150; 
	vars.log[3].speed = 1.2;
	vars.log[4] = {};
	vars.log[4].loglen = 178;
	vars.log[4].pX = 130;		//ROW 5 goes right
	vars.log[4].pY = 116;
	vars.log[4].speed = 1.3;
	vars.logrowspaceS = 250;
	vars.logrowspaceM = 300;
	vars.logrowspaceL = 300;
}

//draws the game's logs 
function drawLogs() {
	//ROW 1 Small
	ctx.drawImage(log3,7,30,800,300,vars.log[0].pX,vars.log[0].pY,85,21);
	ctx.drawImage(log3,7,30,800,300,vars.log[0].pX + vars.logrowspaceS,vars.log[0].pY,85,21);
	ctx.drawImage(log3,7,30,800,300,vars.log[0].pX + 2*vars.logrowspaceS,vars.log[0].pY,85,21);
	//ROW 2 Large
	ctx.drawImage(log1,7,30,900,200,vars.log[1].pX,vars.log[1].pY,178,22);
	ctx.drawImage(log1,7,30,900,200,vars.log[1].pX - vars.logrowspaceL,vars.log[1].pY,178,22);
	//ROW 3 Medium
	ctx.drawImage(log2,7,5,1500,300,vars.log[2].pX,vars.log[2].pY,117,21);
	ctx.drawImage(log2,7,5,1500,300,vars.log[2].pX + vars.logrowspaceM,vars.log[2].pY,117,21);
	//ROW 4 Small
	ctx.drawImage(log4,7,5,1500,200,vars.log[3].pX,vars.log[3].pY,85,21);
	ctx.drawImage(log4,7,5,1500,200,vars.log[3].pX - vars.logrowspaceS,vars.log[3].pY,85,21);
	ctx.drawImage(log4,7,5,1500,200,vars.log[3].pX - 2*vars.logrowspaceS,vars.log[3].pY,85,21);
	//ROW 5 Large
	ctx.drawImage(log3,7,30,1500,300,vars.log[4].pX,vars.log[4].pY,178,22);
	ctx.drawImage(log3,7,30,1500,300,vars.log[4].pX - vars.logrowspaceL,vars.log[4].pY,178,22);
	ctx.drawImage(log3,7,30,1500,300,vars.log[4].pX - 2*vars.logrowspaceL,vars.log[4].pY,178,22);
}

// moves logs across the screen by adding to their position at a constant rate 
function moveLogs() {
	//ROW 1 goes left
	if (vars.log[0].pX < -600) {
		vars.log[0].pX =800;	//right edge of canvas
	}
	else {
		vars.log[0].pX += vars.log[0].speed ;
	}
	//ROW 2 goes right
	if (vars.log[1].pX > 2000) {
		vars.log[1].pX = -vars.log[4].loglen;
	}
	else {
		vars.log[1].pX += vars.log[1].speed;
	}
	//ROW 3 goes left
	if (vars.log[2].pX < -600) {
		vars.log[2].pX = 1000;	//right edge of canvas
	}
	else {
		vars.log[2].pX += vars.log[2].speed;
	}
	//ROW 4 goes right
	if (vars.log[3].pX > 2000) {
		vars.log[3].pX = -vars.log[3].loglen;
	}
	else {
		vars.log[3].pX += vars.log[3].speed;
	}
	//ROW 5 goes right
	if (vars.log[4].pX > 2000) {
		vars.log[4].pX = -vars.log[4].loglen;
	}
	else {
		vars.log[4].pX += vars.log[4].speed;
	}
}

//checks if the frog is on a log. If so, the frog moves with the log 
function frogOnLog() {
	if (vars.frogDead == true) {
		return;
	}
	if ((vars.frogY - 4 >= vars.log[0].pY) && (vars.frogY <= vars.log[0].pY + 25)) {
		if (checkWaterRow1()) {
			vars.frogX += vars.log[0].speed;
		}
		else return;
	}
	else if ((vars.frogY - 4 >= vars.log[1].pY) && (vars.frogY <= vars.log[1].pY + 25)) {
		if (checkWaterRow2()) {
			vars.frogX += vars.log[1].speed;
		}
		else return;
	}
	else if ((vars.frogY - 4 >= vars.log[2].pY) && (vars.frogY <= vars.log[2].pY + 25)) {
		if (checkWaterRow3()) {
			vars.frogX += vars.log[2].speed;
		}
		else return;
	}
	else if ((vars.frogY - 4 >= vars.log[3].pY) && (vars.frogY <= vars.log[3].pY + 25)) {
		if (checkWaterRow4()) {
			vars.frogX += vars.log[3].speed;
		}
		else return;
	}
	else if ((vars.frogY - 4 >= vars.log[4].pY) && (vars.frogY <= vars.log[4].pY + 25)) {
		if (checkWaterRow5()) {
			vars.frogX += vars.log[4].speed;
		}
		else return;
	}
}

//checks if the frog has drowned. calls a function depending on the row
  // the frog is in 
function checkDeathByWater() {
	if ((vars.frogY - 4 >= vars.log[0].pY) && (vars.frogY <= vars.log[0].pY + 25)) {
		if (!checkWaterRow1()) {
			loseLife();
		}
		else return;
	}
	else if ((vars.frogY - 4 >= vars.log[1].pY) && (vars.frogY <= vars.log[1].pY + 25)) {
		if (!checkWaterRow2()) {
			loseLife();
		}
		else return;
	}
	else if ((vars.frogY - 4 >= vars.log[2].pY) && (vars.frogY <= vars.log[2].pY + 25)) {
		if (!checkWaterRow3()) {
			loseLife();
		}
		else return;
	}
	else if ((vars.frogY - 4 >= vars.log[3].pY) && (vars.frogY <= vars.log[3].pY + 25)) {
		if (!checkWaterRow4()) {
			loseLife();
		}
		else return;
	}
	else if ((vars.frogY - 4 >= vars.log[4].pY) && (vars.frogY <= vars.log[4].pY + 25)) {
		if (!checkWaterRow5()) {
			loseLife();
		}
		else return;
	}
	else return true;
}

//checks for drowning if the frog is in water row 1 
function checkWaterRow1() {
	if ((vars.frogX >= vars.log[0].pX - 15) && 
		(vars.frogX <= vars.log[0].pX + vars.log[0].loglen - 20)) {
				return true;
	}
	else if ((vars.frogX >= (vars.log[0].pX + vars.logrowspaceS - 15)) && 
			(vars.frogX <= (vars.log[0].pX + vars.logrowspaceS + vars.log[0].loglen - 20))) {
				return true;
	}
	else if ((vars.frogX >= (vars.log[0].pX + 2*vars.logrowspaceS - 15)) && 
			 (vars.frogX <= (vars.log[0].pX + 2*vars.logrowspaceS + vars.log[0].loglen - 20))) {
				return true;
	}	
	else {
				return false;
	}
}

//checks for drowning if the frog is in water row 2 
function checkWaterRow2() {	
	if ((vars.frogX >= vars.log[1].pX - 15) && 
		(vars.frogX <= vars.log[1].pX + vars.log[1].loglen - 20)) {
				return true;
	}
	else if ((vars.frogX >= (vars.log[1].pX - vars.logrowspaceL - 15)) && 
			 (vars.frogX <= (vars.log[1].pX - vars.logrowspaceL + vars.log[1].loglen - 20))) {
				return true;
	}
	else {
				return false;
	}
}

//checks for drowning if the frog is in water row 3 
function checkWaterRow3() {
	if ((vars.frogX >= vars.log[2].pX - 10) && 
		(vars.frogX <= vars.log[2].pX + vars.log[2].loglen - 15)) {
			return true;
	}
	else if ((vars.frogX >= (vars.log[2].pX + vars.logrowspaceM - 15)) && 
			 (vars.frogX <= (vars.log[2].pX + vars.logrowspaceM + vars.log[2].loglen - 20))) {
			return true;
	}
	else {
			return false;	
	}
}

//checks for drowning if the frog is in water row 4 
function checkWaterRow4() {
	if ((vars.frogX >= vars.log[3].pX - 15) && 
		(vars.frogX <= vars.log[3].pX + vars.log[3].loglen - 20)) {
				return true;
	}
	else if ((vars.frogX >= (vars.log[3].pX - vars.logrowspaceS - 15)) && 
			 (vars.frogX <= (vars.log[3].pX - vars.logrowspaceS + vars.log[3].loglen - 25))) {
				return true;
	}
	else if ((vars.frogX >= (vars.log[3].pX - 2*vars.logrowspaceS - 15)) && 
			 (vars.frogX <= (vars.log[3].pX - 2*vars.logrowspaceS + vars.log[3].loglen - 20))) {
				return true;
	}
	else {
				return false;
	}
}

//checks for drowning if the frog is in water row 5 
function checkWaterRow5() {
	if ((vars.frogX >= vars.log[4].pX - 15) && 
		(vars.frogX <= vars.log[4].pX + vars.log[4].loglen - 20)) {
				return true;
	}
	else if ((vars.frogX >= (vars.log[4].pX - vars.logrowspaceL - 15)) && 
			 (vars.frogX <= (vars.log[4].pX - vars.logrowspaceL + vars.log[4].loglen - 20))) {
				return true;
	}
	else {
				return false;
	}
}