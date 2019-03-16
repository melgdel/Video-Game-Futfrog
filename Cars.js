

function init_game() {
	canvas = document.getElementById ('game');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		rungame(ctx);
	}
	
}

/* initializes car positions and speeds */
// vars -  gives read/write access to variables in:
//read/write access to current variables vars.object

function init_cars() {
	vars.car = new Array();
	vars.car.spacing = 90;
	vars.car[0] = {};
	vars.car[0].pX = 1000;
	vars.car[0].pY = 460;
	vars.car[0].speed = -0.1;
	vars.car[0].len = 50;
	vars.car[1] = {};
	vars.car[1].pX = 0;
	vars.car[1].pY = 428;
	vars.car[1].speed = 3.3;
	vars.car[1].len = 50;
	vars.car[2] = {};
	vars.car[2].pX = 800;
	vars.car[2].pY = 390;
	vars.car[2].speed = -1.1;
	vars.car[2].len = 50;
	vars.car[3] = {};
	vars.car[3].pX = 0;
	vars.car[3].pY = 355;
	vars.car[3].speed = 2.5;
	vars.car[3].len = 50;
	vars.car[4] = {};
	vars.car[4].pX = 800;
	vars.car[4].pY = 330;
	vars.car[4].speed = -2.5;
	vars.car[4].len = 50;
}

// draws the game's cars */
function drawCars() {
	//ROW 1
	ctx.drawImage(car1,0,0,150,110,vars.car[0].pX,vars.car[0].pY,28,24);
	ctx.drawImage(car1,0,0,150,110,vars.car[0].pX + vars.car[0].len + vars.car.spacing,
				 vars.car[0].pY,28,24);
	//ROW 2
	ctx.drawImage(car2,0,0,90,70,vars.car[1].pX,vars.car[1].pY,28,24);
  ctx.drawImage(car2,0,0,90,70,vars.car[1].pX - vars.car.spacing - vars.car[1].len,
				  vars.car[1].pY,28,24);
	//ROW 3
	ctx.drawImage(car3,0,0,90,116,vars.car[2].pX,vars.car[2].pY,28,26);
  ctx.drawImage(car3,0,0,90,116,vars.car[2].pX + vars.car[2].len + vars.car.spacing,
				  vars.car[2].pY,28,26);
	//ROW 4
	ctx.drawImage(car5,0,0,95,116,vars.car[3].pX,vars.car[3].pY,25,22);
	ctx.drawImage(car5,0,0,95,116,vars.car[3].pX - vars.car.spacing - vars.car[3].len,
				  vars.car[3].pY,25,22);
	//ROW 5
	ctx.drawImage(car4,0,0,175,110,vars.car[4].pX,vars.car[4].pY,46,18);
	ctx.drawImage(car4,0,0,175,110,vars.car[4].pX + vars.car[4].len + vars.car.spacing,
				 vars.car[4].pY,46,18);}

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

	/* moves cars across the screen by adding to their position at a constant rate */
function moveCars() {
	//ROW 1 goes left
	if (vars.car[0].pX < -200) {
		vars.car[0].pX = 800;	//right edge of canvas
	}
	else {
		vars.car[0].pX += vars.car[2].speed ;
	}
	//ROW 2 goes right
	if (vars.car[1].pX > 950) {
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
	if (vars.car[3].pX > 1000) {
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

