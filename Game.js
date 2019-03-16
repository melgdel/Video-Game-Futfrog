

/* gets the page canvas, checks for context, and runs the game */
function init_game() {
	canvas = document.getElementById ('game');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		rungame(ctx);
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
	//isFly();
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
	//vars.flyBonus = false;
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
			
				}
				vars.frogY = vars.frogY - 34;
				jumpSound.play();
			}
			break;
		case 39: 		//RIGHT
			if (vars.frogX < 800) {
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
	jumpSound = new Audio('assets/jumpsound.m4a');
	deathSound = new Audio('assets/deathsound.m4a');
}

/* Calls functions to initialize parameters for game status, lives, time, score,
   positions, and more */
function initialize(){
	init_gamestatus();
	init_timeandscore();
	// starting position of frog
	vars.frogX = 350;
	vars.frogY = 494;

	init_cars(); 
	init_logs();
	//init_fly();
}

/* initializes number of lives, game status, frogs on home spaces and deaths */
function init_gamestatus() {
	vars.numLives = 5;
	vars.frogsHome = 0;
	vars.checkH1 = false;
	vars.checkH2 = false;
	vars.checkH3 = false;
	vars.checkH4 = false;
	vars.frogDead = false;
	vars.deathTime = 0;
	vars.gameOver = false;
}

/* initializes time and score parameters */
function init_timeandscore() {
	vars.time = 0;
	vars.timeatreset = 0;		//tracks remaining time when frog gets home
	//vars.level = 1;				//level increases not implemented at this time
	vars.score = 0;
	vars.newLifeCounter = 0;	//counts points for new life bonus
	vars.lastKey = null;		//determine whether to add pts for moving up
	vars.landedFrog = false;
}


/* draws the game background and calls functions to draw additional items including
   cars, logs, lives, and text */
function draw(ctx) {
	//draws the background
	//water
	ctx.fillStyle="#AFEEEE";
	ctx.fillRect(0,0,800,300);
	//trophy area 
	ctx.fillStyle="#BA55D3";
	ctx.fillRect(50,0,650,110);
	//field
	ctx.fillStyle="#3CB371";
	ctx.fillRect(0,300,800,300);

	//fans
	ctx.drawImage(fans,6,0,3000,120,0,0,2500,70);

	//purple strip 

	// between water and road
	ctx.drawImage(dirt,6,0,800,120,0,282,2000,40);
	ctx.fillStyle="00EE00";
	ctx.fillRect(10,55,6,6);
	
	//what frogger stnads on before road 

	ctx.drawImage(dirt,6,0,800,120,0,490,2000,40);
	drawLilyPads();
	drawLives();	
	drawLogs();
	drawCars();



	//Frogger Himself
	if (vars.gameOver == true) {
		gameOver();
		
	}
	else if (vars.frogDead == true) {
		ctx.drawImage(deadsprite,5,3,18,24,vars.frogX,vars.frogY,18,24);		
	}
	else {
		//DRAWS 
		ctx.drawImage(frog,15,15,100,130,vars.frogX,vars.frogY,18,24);
	}
	drawText();
}
//multiple frogs lives 
// draws the lives the player has remaining 
function drawLives() {
	if ( vars.numLives > 0 ) {
		ctx.drawImage(ball,13,0,1000,1000,0,522,55,50);
		if ( vars.numLives > 1 ) {
			ctx.drawImage(ball,13,0,1000,1000,30,522,55,50);
			if ( vars.numLives > 2 ) {
				ctx.drawImage(ball,13,0,1000,1000,60,522,55,50);
				if ( vars.numLives > 3 ) {
					ctx.drawImage(ball,13,0,1000,1000,90,522,55,50);
				}
			}	
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
	if (Math.floor(vars.time/60) > 40) {
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


/* adds points for various game accomplishments. Changes the highscore as necessary */
function addPoints() {
	if (vars.gameOver == false) {
		if (vars.lastKey === 38) {
			vars.score += 10;
			vars.newLifeCounter += 10; 
		}
		if (vars.landedFrog == true) {
			console.log("aqui");
			
			vars.score += 50;
			vars.score += 10*(40 - Math.floor(vars.timeatreset/60)-1);
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
	
		if (vars.score > vars.highscore) {
			vars.highscore = vars.score;
		}
	}
}

/* displays Game Over text and offers the player an opportunity to restart the game */
function gameOver() {

	ctx.drawImage(redflag,260,180,300,250);
	ctx.font = "bold 50pt Georgia";
	ctx.font = "30pt Georgia";
	ctx.fillStyle="#000000";
	ctx.fillText("Hit ENTER to start a new game!", 150, 150);
	ctx.drawImage(deadsprite,5,3,18,24,vars.frogX,vars.frogY,18,24);		
}

