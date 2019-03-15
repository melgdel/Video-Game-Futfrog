
function init_game() {
	canvas = document.getElementById ('game');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		rungame(ctx);
	}
	
}
// draws the game's lily pads 
function drawLilyPads() {
  
  ctx.fillStyle="#0FD1830";
  
	ctx.drawImage(trophy1,105,80,40,30);
	
  ctx.drawImage(trophy2,271,80,40,30);
  
  ctx.drawImage(trophy3,438,80,40,30);
	
	ctx.drawImage(trophy4,605,80,40,30);
  
	
	

	// If Frogger has landed on a Lily Pad, draw him on it
  
  if (vars.checkH1 == true) {
		ctx.drawImage(frog,0,0,23,17,103,81.5,23,17);
	}
	if (vars.checkH2 == true) {
	ctx.drawImage(frog,0,0,23,17,269,81.5,23,17);
	}
	if (vars.checkH3 == true) {
	ctx.drawImage(frog,0,0,23,17,436,81.5,23,17);
	}
	if (vars.checkH4 == true) {
	ctx.drawImage(frog,12,0,23,17,603,81.5,23,17);
	}
	
}

//draws text at the bottom of the screen with game info 
function drawText() {
	ctx.font = "bold 15pt arial";
	ctx.fillStyle="#000000";
	//ctx.fillText("Level "+vars.level,100,545);
	ctx.font = "bold 15pt arial";
	ctx.fillText("Score: "+vars.score,200,562);
	ctx.fillText("Highscore: "+vars.highscore,500,562);
	var secondsLeft = 40 - (Math.floor(vars.time/60));
	secondsLeft.toFixed(0);
	if ((secondsLeft < 10) && (secondsLeft > 3)) {
		ctx.fillStyle="#2F4F4F";
	}
	if (secondsLeft <= 3) {
		ctx.fillStyle="#0FD1830";
	}
	ctx.fillText("Time: " + secondsLeft, 350, 545);
}

//checks if the frog has reached a home lily pad 
function checkHome() {
	if (vars.frogY < 108) {
		if ((vars.frogX > 7) && (vars.frogX < 29)) {
			vars.checkH1 = true;
			vars.landedFrog = true;
			console.log("aqui");
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
		
	}
} 

//empties the lily pads if all 4 had previously been filled 
function emptyHomeSlots() {
	vars.frogsHome = 0;
	vars.checkH1 = false;
	vars.checkH2 = false;
	vars.checkH3 = false;
	vars.checkH4 = false;
	
}