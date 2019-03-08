/* gets the page canvas, checks for context, and runs the game */
function init_game() {
	canvas = document.getElementById ('game');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		rungame(ctx);
	}
	else {
		alert("Browser does not support canvas.");
	}
}

/* resets the highscore, declares the object vars that will contain all game variables,
   calls functions to load audio, initializes variables, document keypresses, and most
   importantly, sets the mainloop for the game which is update() and draw() at a set rate
   and runs the mainloop in setInterval() */
function rungame(ctx) {
	vars = new Object();
	vars.highscore = 0;
	add_audio();
	initialize();
	
    var ONE_FRAME_TIME = 1000 / 60 ;
	var mainloop = function() {
		update();
		draw(ctx);
	}
	keypress();
	restartGame();
	setInterval( mainloop, ONE_FRAME_TIME );
}

/* calls functions to update the variables of the game and determine if changes need to
   be made/redrawn */
function update() {
	moveCars();
	moveLogs();
	frogOnLog();
	isFly();
	if (vars.frogDead == true) {
		deathWait();
	}
	else {
		checkHome();
		checkDead();
		addPoints();
		vars.time++;
	}
	vars.lastKey = null;
	vars.landedFrog = false;	
	vars.flyBonus = false;
}

/* moves the frog up, down, left, or right depending on the key pressed. Plays a sound
   if a move is made */		
function keypress() {		
	document.addEventListener("keydown", function(event) {
	if ((vars.gameOver == false ) && (vars.frogDead == false)) {
		vars.lastKey = event.keyCode;
		switch(event.keyCode) {
		case 37: 		//LEFT
			if (vars.frogX > 17) {
				vars.frogX = vars.frogX - 15;
				jumpSound.play();
			}
			break;
		case 38: 		//UP
			if (vars.frogY > 75) {
				if (vars.frogY < 123) {
					if ((vars.checkH1 == true) && ((vars.frogX > 7) && (vars.frogX < 29))) {
						return;
					}
					if ((vars.checkH2 == true) && ((vars.frogX > 93) && (vars.frogX < 115))) {
						return;
					}
					if ((vars.checkH3 == true) && ((vars.frogX > 178) && (vars.frogX < 200))) {
						return;
					}
					if ((vars.checkH4 == true) && ((vars.frogX > 261) && (vars.frogX < 284))) {
						return;
					}
					if ((vars.checkH5 == true) && ((vars.frogX > 348) && (vars.frogX < 368))) {
						return;
					}
				}
				vars.frogY = vars.frogY - 34;
				jumpSound.play();
			}
			break;
		case 39: 		//RIGHT
			if (vars.frogX < 750) {
				vars.frogX = vars.frogX + 15;
				jumpSound.play();
			}
			break;
		case 40:		//DOWN
			if (vars.frogY < 490) {
				vars.frogY = vars.frogY + 34;
				jumpSound.play();
			}
			break;
		}
	}
	});
}

/* allows the user to restart the game by pressing enter */
function restartGame() {
	if ( vars.gameOver == false ) {
		document.addEventListener("keydown", function(event) {
		if (event.keyCode === 13) {
			initialize();
		}
		});
	}
}

/* loads audio files for play in game */
function add_audio() {
	//jumpSound = new Audio('assets/jumpsound.m4a');
	//deathSound = new Audio('assets/deathsound.m4a');
}

/* Calls functions to initialize parameters for game status, lives, time, score,
   positions, and more */
function initialize(){
	init_gamestatus();
	init_timeandscore();
	// starting position of frog
	vars.frogX = 188;
	vars.frogY = 494;
	init_cars();
	init_logs();
	init_fly();
}

/* initializes number of lives, game status, frogs on home spaces and deaths */
function init_gamestatus() {
	vars.numLives = 5;
	vars.frogsHome = 0;
	vars.checkH1 = false;
	vars.checkH2 = false;
	vars.checkH3 = false;
	vars.checkH4 = false;
	vars.checkH5 = false;
	vars.frogDead = false;
	vars.deathTime = 0;
	vars.gameOver = false;
}

/* initializes time and score parameters */
function init_timeandscore() {
	vars.time = 0;
	vars.timeatreset = 0;		//tracks remaining time when frog gets home
	vars.level = 1;				//level increases not implemented at this time
	vars.score = 0;
	vars.newLifeCounter = 0;	//counts points for new life bonus
	vars.lastKey = null;		//determine whether to add pts for moving up
	vars.landedFrog = false;
}

/* initializes car positions and speeds */
function init_cars() {
	vars.car = new Array();
	vars.car.spacing = 90;
	vars.car[0] = {};
	vars.car[0].pX = 800;
	vars.car[0].pY = 460;
	vars.car[0].speed = -0.8;
	vars.car[0].len = 28;
	vars.car[1] = {};
	vars.car[1].pX = 0;
	vars.car[1].pY = 428;
	vars.car[1].speed = 1.3;
	vars.car[1].len = 28;
	vars.car[2] = {};
	vars.car[2].pX = 800;
	vars.car[2].pY = 390;
	vars.car[2].speed = -1.1;
	vars.car[2].len = 24;
	vars.car[3] = {};
	vars.car[3].pX = 0;
	vars.car[3].pY = 355;
	vars.car[3].speed = 1.5;
	vars.car[3].len = 25;
	vars.car[4] = {};
	vars.car[4].pX = 800;
	vars.car[4].pY = 330;
	vars.car[4].speed = -2.5;
	vars.car[4].len = 46;
}

/* initializes log positions and speeds */
function init_logs() {
	vars.log = new Array();
	vars.log[0] = {};
	vars.log[0].pX = 180;		//1 goes left
	vars.log[0].pY = 252;
	vars.log[0].loglen = 85;
	vars.log[0].speed = -0.8;
	vars.log[1] = {};
	vars.log[1].loglen = 178;
	vars.log[1].pX = 250;		//ROW 2 goes right
	vars.log[1].pY = 218;
	vars.log[1].speed = 0.9;
	vars.log[2] = {};
	vars.log[2].loglen = 117;
	vars.log[2].pX = 300;		//ROW 3 goes left
	vars.log[2].pY = 184;
	vars.log[2].speed = -1.0;
	vars.log[3] = {};
	vars.log[3].loglen = 85;
	vars.log[3].pX = 170;		//ROW 4 goes right
	vars.log[3].pY = 150;
	vars.log[3].speed = 1.3;
	vars.log[4] = {};
	vars.log[4].loglen = 178;
	vars.log[4].pX = 130;		//ROW 5 goes right
	vars.log[4].pY = 116;
	vars.log[4].speed = 1.5;
	vars.logrowspaceS = 135;
	vars.logrowspaceM = 167;
	vars.logrowspaceL = 228;
}

/* initializes fly variables */
function init_fly() {
	vars.flyPresent = false;
	vars.flyLilyNum = null;
	vars.chooseLily = true;
	vars.flyBonus = false;
	vars.lastFlyBonus = new Date().getTime();
}

/* draws the game background and calls functions to draw additional items including
   cars, logs, a fly, lives, and text */
function draw(ctx) {
	//draws the background
	ctx.fillStyle="#B6C8D8";
	ctx.fillRect(0,0,800,282.5);
	ctx.fillStyle="#84858D";
	ctx.fillRect(0,282.5,800,282.5);
	sprite = document.getElementById ('sprite');
	//header image
	ctx.drawImage(sprite,0,0,800,110,0,0,800,110);
	//pathway images
	ctx.drawImage(sprite,0,119,800,34,0,282,800,34);
	ctx.drawImage(sprite,0,119,800,34,0,490,800,34);
	drawLilyPads();
	drawLives();	
	drawLogs();
	drawFly();
	drawCars();
	//Frogger Himself
	if (vars.gameOver == true) {
		gameOver();
		
	}
	else if (vars.frogDead == true) {
		ctx.drawImage(deadsprite,5,3,18,24,vars.frogX,vars.frogY,18,24);		
	}
	else {
		ctx.drawImage(sprite,12,369,23,17,vars.frogX,vars.frogY,23,17);
	}
	drawText();
}

/* draws the lives the player has remaining */
function drawLives() {
	if ( vars.numLives > 0 ) {
		ctx.drawImage(sprite,13,334,17,23,0,522,17,23);
		if ( vars.numLives > 1 ) {
			ctx.drawImage(sprite,13,334,17,23,20,522,17,23);
			if ( vars.numLives > 2 ) {
				ctx.drawImage(sprite,13,334,17,23,40,522,17,23);
				if ( vars.numLives > 3 ) {
					ctx.drawImage(sprite,13,334,17,23,60,522,17,23);
				}
			}	
		}
	}
}

/* draws the game's cars */
function drawCars() {
	//ROW 1
	ctx.drawImage(sprite,10,267,28,20,vars.car[0].pX,vars.car[0].pY,28,20);
	ctx.drawImage(sprite,10,267,28,20,vars.car[0].pX + vars.car[0].len + vars.car.spacing,
				  vars.car[0].pY,28,20);
	//ROW 2
	ctx.drawImage(sprite,46,265,28,24,vars.car[1].pX,vars.car[1].pY,28,24);
	ctx.drawImage(sprite,46,265,28,24,vars.car[1].pX - vars.car.spacing - vars.car[1].len,
				  vars.car[1].pY,28,24);
	//ROW 3
	ctx.drawImage(sprite,82,264,24,26,vars.car[2].pX,vars.car[2].pY,24,26);
	ctx.drawImage(sprite,82,264,24,26,vars.car[2].pX + vars.car[2].len + vars.car.spacing,
				  vars.car[2].pY,24,26);
	//ROW 4
	ctx.drawImage(sprite,73,301,25,22,vars.car[3].pX,vars.car[3].pY,25,22);
	ctx.drawImage(sprite,73,301,25,22,vars.car[3].pX - vars.car.spacing - vars.car[3].len,
				  vars.car[3].pY,25,22);
	//ROW 5
	ctx.drawImage(sprite,106,302,46,18,vars.car[4].pX,vars.car[4].pY,46,18);
	ctx.drawImage(sprite,106,302,46,18,vars.car[4].pX + vars.car[4].len + vars.car.spacing,
				  vars.car[4].pY,46,18);
}

/* draws the game's logs */
function drawLogs() {
	//ROW 1 Small
	ctx.drawImage(sprite,7,230,85,21,vars.log[0].pX,vars.log[0].pY,85,21);
	ctx.drawImage(sprite,7,230,85,21,vars.log[0].pX + vars.logrowspaceS,vars.log[0].pY,85,21);
	ctx.drawImage(sprite,7,230,85,21,vars.log[0].pX + 2*vars.logrowspaceS,vars.log[0].pY,85,21);
	//ROW 2 Large
	ctx.drawImage(sprite,7,165,178,22,vars.log[1].pX,vars.log[1].pY,178,22);
	ctx.drawImage(sprite,7,165,178,22,vars.log[1].pX - vars.logrowspaceL,vars.log[1].pY,178,22);
	//ROW 3 Medium
	ctx.drawImage(sprite,7,198,117,21,vars.log[2].pX,vars.log[2].pY,117,21);
	ctx.drawImage(sprite,7,198,117,21,vars.log[2].pX + vars.logrowspaceM,vars.log[2].pY,117,21);
	//ROW 4 Small
	ctx.drawImage(sprite,7,230,85,21,vars.log[3].pX,vars.log[3].pY,85,21);
	ctx.drawImage(sprite,7,230,85,21,vars.log[3].pX - vars.logrowspaceS,vars.log[3].pY,85,21);
	ctx.drawImage(sprite,7,230,85,21,vars.log[3].pX - 2*vars.logrowspaceS,vars.log[3].pY,85,21);
	//ROW 5 Large
	ctx.drawImage(sprite,7,165,178,22,vars.log[4].pX,vars.log[4].pY,178,22);
	ctx.drawImage(sprite,7,165,178,22,vars.log[4].pX - vars.logrowspaceL,vars.log[4].pY,178,22);
}

/* draws the game's lily pads */
function drawLilyPads() {
	ctx.fillStyle="00BB00";
	ctx.fillRect(17,80,20,20);
	ctx.fillRect(102.5,80,20,20);
	ctx.fillRect(187.5,80,20,20);
	ctx.fillRect(271,80,20,20);
	ctx.fillRect(356.5,80,20,20);
	ctx.fillStyle="00EE00";
	ctx.fillRect(24,87,6,6);
	ctx.fillRect(109.5,87,6,6);
	ctx.fillRect(194.5,87,6,6);
	ctx.fillRect(278,87,6,6);
	ctx.fillRect(363.5,87,6,6);
	// If Frogger has landed on a Lily Pad, draw him on it
	if (vars.checkH1 == true) {
		ctx.drawImage(sprite,12,369,23,17,15.5,81.5,23,17);
	}
	if (vars.checkH2 == true) {
		ctx.drawImage(sprite,12,369,23,17,101,81.5,23,17);
	}
	if (vars.checkH3 == true) {
		ctx.drawImage(sprite,12,369,23,17,186,81.5,23,17);
	}
	if (vars.checkH4 == true) {
		ctx.drawImage(sprite,12,369,23,17,269.5,81.5,23,17);
	}
	if (vars.checkH5 == true) {
		ctx.drawImage(sprite,12,369,23,17,354,81.5,23,17);
	}
}

/* draws the game fly */
function drawFly() {
	if (vars.flyPresent == true) {
		if (vars.flyLilyNum == 1) {
			if (!vars.checkH1) {
				ctx.drawImage(sprite,140,236,16,16,19,82,16,16);
			}
		}
		if (vars.flyLilyNum == 2) {
			if (!vars.checkH2) {
				ctx.drawImage(sprite,140,236,16,16,104.5,82,16,16);
			}
		}
		if (vars.flyLilyNum == 3) {
			if (!vars.checkH3) {
				ctx.drawImage(sprite,140,236,16,16,189.5,82,16,16);
			}
		}
		if (vars.flyLilyNum == 4) {
			if (!vars.checkH4) {
				ctx.drawImage(sprite,140,236,16,16,273,82,16,16);
			}
		}
		if (vars.flyLilyNum == 5) {
			if (!vars.checkH4) {
				ctx.drawImage(sprite,140,236,16,16,358,82,16,16);
			}
		}
	}
}

/* draws text at the bottom of the screen with game info */
function drawText() {
	ctx.font = "bold 22pt arial";
	ctx.fillStyle="#00FF00";
	ctx.fillText("Level "+vars.level,100,545);
	ctx.font = "bold 14pt arial";
	ctx.fillText("Score: "+vars.score,0,562);
	ctx.fillText("Highscore: "+vars.highscore,220,562);
	var secondsLeft = 30 - (Math.floor(vars.time/60));
	secondsLeft.toFixed(0);
	if ((secondsLeft < 10) && (secondsLeft > 3)) {
		ctx.fillStyle="#FF6600";
	}
	if (secondsLeft <= 3) {
		ctx.fillStyle="#FF0000";
	}
	ctx.fillText("Time: " + secondsLeft, 220, 545);
}

/* moves logs across the screen by adding to their position at a constant rate */
function moveLogs() {
	//ROW 1 goes left
	if (vars.log[0].pX < -365) {
		vars.log[0].pX =800;	//right edge of canvas
	}
	else {
		vars.log[0].pX += vars.log[0].speed ;
	}
	//ROW 2 goes right
	if (vars.log[1].pX > 680) {
		vars.log[1].pX = -vars.log[4].loglen;
	}
	else {
		vars.log[1].pX += vars.log[1].speed;
	}
	//ROW 3 goes left
	if (vars.log[2].pX < -280) {
		vars.log[2].pX = 800;	//right edge of canvas
	}
	else {
		vars.log[2].pX += vars.log[2].speed;
	}
	//ROW 4 goes right
	if (vars.log[3].pX > 665) {
		vars.log[3].pX = -vars.log[3].loglen;
	}
	else {
		vars.log[3].pX += vars.log[3].speed;
	}
	//ROW 5 goes right
	if (vars.log[4].pX > 680) {
		vars.log[4].pX = -vars.log[4].loglen;
	}
	else {
		vars.log[4].pX += vars.log[4].speed;
	}
}

/* moves cars across the screen by adding to their position at a constant rate */
function moveCars() {
	//ROW 1 goes left
	if (vars.car[0].pX < -200) {
		vars.car[0].pX = 800;	//right edge of canvas
	}
	else {
		vars.car[0].pX += vars.car[0].speed ;
	}
	//ROW 2 goes right
	if (vars.car[1].pX > 530) {
		vars.car[1].pX = -vars.car[1].len;
	}
	else {
		vars.car[1].pX += vars.car[1].speed;
	}
	//ROW 3 goes left
	if (vars.car[2].pX < -240) {
		vars.car[2].pX = 800;	//right edge of canvas
	}
	else {
		vars.car[2].pX += vars.car[2].speed;
	}
	//ROW 4 goes right
	if (vars.car[3].pX > 520) {
		vars.car[3].pX = -vars.car[3].len;
	}
	else {
		vars.car[3].pX += vars.car[3].speed;
	}
	//ROW 5 goes left
	if (vars.car[4].pX < -240) {
		vars.car[4].pX = 800;
	}
	else {
		vars.car[4].pX += vars.car[4].speed;
	}
}

/* checks if the frog is on a log. If so, the frog moves with the log */
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

/* checks if the frog has reached a home lily pad */
function checkHome() {
	if (vars.frogY < 108) {
		if ((vars.frogX > 7) && (vars.frogX < 29)) {
			vars.checkH1 = true;
			vars.landedFrog = true;
			if (((vars.flyPresent == true) && vars.flyLilyNum === 1)) {
				vars.flyBonus = true;
				vars.lastFlyBonus = Date.now();
			}
			frogReset();
			vars.frogsHome++;
			return;
		}
		if ((vars.frogX > 93) && (vars.frogX < 115)) {
			vars.checkH2 = true;
			vars.landedFrog = true;
			frogReset();
			if ((vars.flyPresent == true) && (vars.flyLilyNum === 2)) {
				vars.flyBonus = true;
				vars.lastFlyBonus = Date.now();
			}
			vars.frogsHome++;
			return;
		}
		if ((vars.frogX > 178) && (vars.frogX < 200)) {
			vars.checkH3 = true;
			vars.landedFrog = true;
			frogReset();
			if ((vars.flyPresent == true) && (vars.flyLilyNum === 3)) {
				vars.flyBonus = true;
				vars.lastFlyBonus = Date.now();

			}
			vars.frogsHome++;
			return;
		}
		if ((vars.frogX > 261) && (vars.frogX < 284)) {
			vars.checkH4 = true;
			vars.landedFrog = true;
			frogReset();
			if ((vars.flyPresent == true) && (vars.flyLilyNum === 4)) {
				vars.flyBonus = true;
				vars.lastFlyBonus = Date.now();

			}
			vars.frogsHome++;
			return;
		}
		if ((vars.frogX > 348) && (vars.frogX < 368)) {
			vars.checkH5 = true;
			vars.landedFrog = true;
			frogReset();
			if ((vars.flyPresent == true) && (vars.flyLilyNum === 5)) {
				vars.flyBonus = true;
				vars.lastFlyBonus = Date.now();
			}
			vars.frogsHome++;
			return;
		}
	}
}

/* calls functions to check if the frog has died */
function checkDead() {
	if (!checkTime()) {
		return;
	}
	if (!checkInBounds()) {
		return;
	}
	if ((vars.frogY > 316) && (vars.frogY < 490)) {
		if (!checkDeathByCar()) {
			return;	
		}
	}
	if ((vars.frogY < 282.5) && (vars.frogY > 110)) {
		if (!checkDeathByWater()) {
			return;
		}
	}
	if (vars.frogY < 108) {
		if (!checkDeathByHeader()) {
			return;
		}
	}
}

/* checks if time has run out */
function checkTime() {
	if (Math.floor(vars.time/60) > 30) {
		loseLife();
	}
	else return true;
}

/* checks if the frog has tried to move to or past the edge of the screen */
function checkInBounds() {
	if (vars.frogY > 524) {
		loseLife();
	}
	else if (vars.frogY < 70) {
		loseLife();
	}
	else if (vars.frogX < 0) {
		loseLife();
	}
	else if (vars.frogX > 800) {
		loseLife();
	}
	else return true;
}

/* checks if the frog has been run over by a car. calls a function depending on the row
   the frog is in */
function checkDeathByCar() {
	if ((vars.frogY +17 >= vars.car[0].pY) && (vars.frogY <= vars.car[0].pY + 20)) {
		if (!checkCarRow1()) {
			loseLife();
		}
		else return;
	}
	else if ((vars.frogY + 17 >= vars.car[1].pY) && (vars.frogY <= vars.car[1].pY + 24)) {
		if (!checkCarRow2()) {
			loseLife();
		}
		else return;
	}
	else if ((vars.frogY + 17 >= vars.car[2].pY) && (vars.frogY <= vars.car[2].pY + 26)) {
		if (!checkCarRow3()) {
			loseLife();
		}
		else return;
	}
	else if ((vars.frogY + 17 >= vars.car[3].pY) && (vars.frogY <= vars.car[3].pY + 22)) {
		if (!checkCarRow4()) {
			loseLife();
		}
		else return;
	}
	else if ((vars.frogY + 17 >= vars.car[4].pY) && (vars.frogY <= vars.car[4].pY + 18)) {
		if (!checkCarRow5()) {
			loseLife();
		}
		else return;
	}
	else return true;

}

/* checks for car collisions if the frog is in car row 1 */
function checkCarRow1() {
	if ((vars.frogX + 23 >= vars.car[0].pX) && 
		(vars.frogX <= vars.car[0].pX + 28)) {
				return false;
	}
	else if ((vars.frogX + 23 >= (vars.car[0].pX + vars.car.spacing + vars.car[0].len)) && 
			(vars.frogX <= vars.car[0].pX + vars.car.spacing + 2*vars.car[0].len)) {
				return false;
	}
	else {
				return true;
	}
}

/* checks for car collisions if the frog is in car row 2 */
function checkCarRow2() {
	if ((vars.frogX <= vars.car[1].pX + 28) && 
		(vars.frogX + 23 >= vars.car[1].pX)) {
				return false;
	}
	else if ((vars.frogX <= (vars.car[1].pX - vars.car.spacing)) && 
			(vars.frogX + 23 >= vars.car[1].pX - vars.car.spacing - 28)) {
				return false;
	}
	else {
				return true;
	}
}

/* checks for car collisions if the frog is in car row 3 */
function checkCarRow3() {
	if ((vars.frogX + 23 >= vars.car[2].pX) && 
		(vars.frogX <= vars.car[2].pX + 24)) {
				return false;
	}
	else if ((vars.frogX + 23 >= (vars.car[2].pX + vars.car.spacing + vars.car[2].len)) && 
			(vars.frogX <= vars.car[2].pX + vars.car.spacing + 2*vars.car[2].len)) {
				return false;
	}
	else {
				return true;
	}
}

/* checks for car collisions if the frog is in car row 4 */
function checkCarRow4() {
	if ((vars.frogX <= vars.car[3].pX + 25) && 
		(vars.frogX + 23 >= vars.car[3].pX)) {
				return false;
	}
	else if ((vars.frogX <= (vars.car[3].pX - vars.car.spacing)) && 
			(vars.frogX + 23 >= vars.car[3].pX - vars.car.spacing - 25)) {
				return false;
	}
	else {
				return true;
	}
}

/* checks for car collisions if the frog is in car row 5 */
function checkCarRow5() {
	if ((vars.frogX + 23 >= vars.car[4].pX) && 
		(vars.frogX <= vars.car[4].pX + 46)) {
				return false;
	}
	else if ((vars.frogX + 23 >= (vars.car[4].pX + vars.car.spacing + vars.car[4].len)) && 
			(vars.frogX <= vars.car[4].pX + vars.car.spacing + 2*vars.car[4].len)) {
				return false;
	}
	else {
				return true;
	}
}

/* checks if the frog has drowned. calls a function depending on the row
   the frog is in */
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

/* checks for drowning if the frog is in water row 1 */
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

/* checks for drowning if the frog is in water row 2 */
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

/* checks for drowning if the frog is in water row 3 */
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

/* checks for drowning if the frog is in water row 4 */
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

/* checks for drowning if the frog is in water row 5 */
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

/* checks if the frog has jumped into the bushes of the header */
function checkDeathByHeader() {
	if (   ((vars.frogX > 7) && ((vars.frogX + 17) < 46)) 
	    || ((vars.frogX > 93) && ((vars.frogX + 17) < 132))
		|| ((vars.frogX > 178) && ((vars.frogX + 17) < 217))
		|| ((vars.frogX > 261) && ((vars.frogX + 17) < 301)) 
		|| ((vars.frogX > 348) && ((vars.frogX + 17) < 385))
	){
		return true;
	}
	else {
		loseLife();
	}
}

/* tracks the time the frog died, and marks the frog dead which will trigger a 1 second
   death animation before reviving the frog with a new life or ending the game. Also 
   plays a death sound */
function loseLife() {
	vars.deathTime = Date.now();
	vars.frogDead = true;
	deathSound.play();
}

/* if the frog is dead, checks if it has been a full second since then to allow the 
   death animation sprite to be visible. If so, subtracts a life and revives the frog, or
   ends the game. */
function deathWait() {
	if (vars.frogDead == true) {
		var currentTime = Date.now();
		timeSinceDeath = currentTime - vars.deathTime;
		if (timeSinceDeath < 1000) {
			return;
		}
		else {
			if (vars.numLives > 0) {
				vars.numLives--;
				frogReset();
			}
			else {
				vars.gameOver = true;
			}
			vars.frogDead = false;
		}
	}
}

/* resets the frog's position and the timer. Also notes what time the reset was made for
   scoring purposes */
function frogReset() {	
		vars.frogX = 188;
		vars.frogY = 494;
		vars.timeatreset = vars.time;
		vars.time = 0;
}	

/* calls for appearances from the fly. The fly is to appear thirty seconds after game
   start, and stay for thirty seconds. He reappears thirty seconds after being eaten, or
   thirty seconds after he goes away without being eaten. He appears on a random lily pad
   not currently inhabited by a frog */
function isFly() {
	var currentTime = Date.now();
	timeSinceFly = currentTime - vars.lastFlyBonus;
	if ((timeSinceFly >= 30000) && (timeSinceFly <= 60000)) {
		if (vars.chooseLily == true) {
			flyLilyRandomizer();
		}
		vars.flyPresent = true;
		return;
	}
	if (timeSinceFly >= 60001) {
		vars.lastFlyBonus = Date.now();
		vars.chooseLily = true;
	}
	vars.flyPresent = false;
}

/* randomly selects a lily pad for the fly. If a frog already sits on the lily pad chosen,
   randomizes until a conflict is no longer present 
function flyLilyRandomizer() {
	var goodNum = false;
	while(goodNum == false) {
		vars.flyLilyNum = Math.floor((Math.random()*5)+1);
		if (    (vars.checkH1 == true) && (vars.checkH2 == true)
				  && (vars.checkH3 == true) && (vars.checkH4 == true)
				  && (vars.checkH5 == true)) {
			vars.flyLilyNum = 0;
			goodNum = true;
		}
		else if (vars.flyLilyNum == 1) {
			if (vars.checkH1 == false) {
				goodNum = true;
			}
		}
		else if (vars.flyLilyNum == 2) {
			if (vars.checkH2 == false) {
				goodNum = true;
			}
		}
		else if (vars.flyLilyNum == 3) {
			if (vars.checkH3 == false) {
				goodNum = true;
			}
		}
		else if (vars.flyLilyNum == 4) {
			if (vars.checkH4 == false) {
				goodNum = true;
			}
		}
		else if (vars.flyLilyNum == 5) {
			if (vars.checkH5 == false) {
				goodNum = true;
			}
		}
		else {}
	}
	vars.chooseLily = false;
} 
*/

/* adds points for various game accomplishments. Changes the highscore as necessary */
function addPoints() {
	if (vars.gameOver == false) {
		if (vars.lastKey === 38) {
			vars.score += 10;
			vars.newLifeCounter += 10; 
		}
		if (vars.landedFrog == true) {
			vars.score += 50;
			vars.score += 10*(30 - Math.floor(vars.timeatreset/60));
			vars.newLifeCounter += 10; 
			if (vars.frogsHome === 5) {
				vars.score += 1000;
				vars.newLifeCounter += 1000; 
				vars.frogsHome = 0;
				emptyHomeSlots();
			}
		}	
		if (vars.newLifeCounter >= 10000) {
			if (vars.numLives < 4) {
				vars.numLives++;
			}
			vars.newLifeCounter = 0;
		}
		/*if (vars.flyBonus == true) {
			vars.score += 200;
			vars.newLifeCounter += 200;
		} */
		if (vars.score > vars.highscore) {
			vars.highscore = vars.score;
		}
	}
}

/* empties the lily pads if all five had previously been filled */
function emptyHomeSlots() {
	vars.frogsHome = 0;
	vars.checkH1 = false;
	vars.checkH2 = false;
	vars.checkH3 = false;
	vars.checkH4 = false;
	vars.checkH5 = false;
}

/* displays Game Over text and offers the player an opportunity to restart the game */
function gameOver() {
	ctx.font = "bold 32pt Georgia";
	ctx.fillStyle="#00FF00";	
	ctx.fillText("G A M E  O V E R",20,300);
	ctx.font = "18pt Georgia";
	ctx.fillStyle="#00FF00";
	ctx.fillText("Hit ENTER to start a new game!", 30, 350);
	ctx.drawImage(deadsprite,5,3,18,24,vars.frogX,vars.frogY,18,24);		
}
