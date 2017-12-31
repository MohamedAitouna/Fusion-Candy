var BOARD_COLS = 7;
var BOARD_ROWS = 7;
var groupeObject2 = null;
var spreetObject = "";
var allowInput2;
var onObject2 = false; // onObject2===true if the mouse on click on Object
var objectX2;
var objectY2;
var newObject2X;
var newObject2Y;
var idX;
var idY;

var ourObject;
var newObject;
var tw1;
var tw2;

var objectToDeathX = [];
var objectToDeathX2 = [];
var objectToDeathY = [];
var objectToDeathY2 = [];
var pool = 0;

var speed = 150;
var frameSpeed = 52;
var frameSpeedMSeconde = 125;
var text;
var moves;
var scorrre = -BOARD_COLS * BOARD_ROWS;
var __this;
var backB;


function init() {

	onObject2 = false;
	pool = 0;
	speed = 150;
	scorrre = -BOARD_COLS * BOARD_ROWS;
}


function endLvl(){
	var good=__this.add.sprite(0, __this.game.height, 'good');
	  __this. game.world.bringToTop(backB);
	var twGood = __this.add.tween(good).to({x: 0,y:160}, 1000, Phaser.Easing.Linear.None, true);
}


function backk(item) {

	item.loadTexture('back0');
	// __this.game.state.start('Levels', true, false);
}

function backu(item) {

	item.loadTexture('back');
	__this.game.state.start('Levels', true, false);
}



//-----------------------------------------------------------------------------------------------------------------
//---------------------------------------------Helpful functions---------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

var OA = 0;
// find a object on the board according to its position on the board
function getGem(posX, posY) {
	var omg = groupeObject2.iterate("id", calcObjectId(posX, posY), Phaser.Group.RETURN_CHILD);
	return omg;

}

// since the groupeObject2 are a spritesheet, their color is the same as the current frame number
function getGemColor(gem) {
	return gem.frame;
}

// set the object spritesheet to a random frame
function randomizeGemColor(gem) {
	gem.frame = __this.rnd.integerInRange(0, numbOfFram) * 7;
	// gem.frame = __this.rnd.integerInRange(0, gem.animations.frameTotal - 1);
}


// set the position on the board for a object
function setObjectPos(gem, posX, posY) {
	gem.posX = posX;
	gem.posY = posY;
	gem.id = calcObjectId(posX, posY);
}

// the Object id is used by getGem() to find specific Objects in the group
// each position on the board has a unique id
function calcObjectId(posX, posY) {
	return posX + posY * BOARD_COLS;
}

// move groupeObject2 that have been killed off the board
function removeKilledGems() {
	groupeObject2.forEach(function (gem) {
		if (!gem.alive) {
			setObjectPos(gem, -1, -1);
		}
	});
}



//--------------------------------------------------------------------------------------
//-----------------------------------------------Bigg functions XD XD-------------------
//--------------------------------------------------------------------------------------


// animated OBJECT movement
function tweenGemPos(gem, newPosX, newPosY, durationMultiplier) {

	// //console.log('Tween ',gem.name,' from ',gem.posX, ',', gem.posY, ' to ', newPosX, ',', newPosY);
	if (durationMultiplier === null || typeof durationMultiplier === 'undefined') {
		durationMultiplier = 1;
	}

	return __this.add.tween(gem).to({
		x: (newPosX * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_x,
		y: (newPosY * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_y
	}, speed * durationMultiplier, Phaser.Easing.Linear.None, true);

}


var animationObject = [];
// fill the screen with as many groupeObject2 as possible
function spawnBoard() {
	console.log("numbOfFram", numbOfFram);
	groupeObject2 = __this.add.group();
	groupeLineH = __this.add.group();
	groupeLineV = __this.add.group();


	for (var i = 0; i < BOARD_COLS; i++) {
		var lineH = groupeLineH.create(FRAME_SIZE_SPACED * space_grid_x - (FRAME_SPACING / 2), (i * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_y - (FRAME_SPACING / 2), 'lineH');
		lineH.width = FRAME_SIZE_SPACED * BOARD_COLS;
		for (var j = 0; j < BOARD_ROWS; j++) {
			if (i == 0) {
				var lineV = groupeLineV.create((j * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_x - (FRAME_SPACING / 2), FRAME_SIZE_SPACED * space_grid_y - (FRAME_SPACING / 2), 'lineV');
				lineV.height = FRAME_SIZE_SPACED * BOARD_ROWS;
			}
			//background of objects
			var backObj = __this.add.sprite((i * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_x - (FRAME_SPACING / 2), (j * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_y - (FRAME_SPACING / 2), 'backobj');
			backObj.height = FRAME_SIZE_SPACED;
			backObj.width = FRAME_SIZE_SPACED;
			backObj.alpha = 0.7;
			var gem = groupeObject2.create((i * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_x, (j * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_y, spreetObject);
			gem.name = 'gem' + i.toString() + 'x' + j.toString();
			gem.inputEnabled = true;
			gem.events.onInputDown.add(onObjectInputDown, __this);
			gem.events.onInputUp.add(onObjectInputUp, __this);
			randomizeGemColor(gem);
			setObjectPos(gem, i, j); // each gem has a position on the board

			// var animF=gem.frame;
			// animationObject[i+j* BOARD_COLS]=gem.animations.add("test",[animF,animF+1,animF+2,animF+3,animF+4,animF+5,animF+6],frameSpeed,true);
			//animationObject[i+j* BOARD_COLS].play();


			gem.kill();
		}
		if (i == 0) {
			var lineV = groupeLineV.create((j * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_x - (FRAME_SPACING / 2), FRAME_SIZE_SPACED * space_grid_y - (FRAME_SPACING / 2), 'lineV');
			lineV.height = FRAME_SIZE_SPACED * BOARD_ROWS;
		}
	}
	var lineH = groupeLineH.create(FRAME_SIZE_SPACED * space_grid_x - (FRAME_SPACING / 2), (i * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_y - (FRAME_SPACING / 2), 'lineH');
	lineH.width = FRAME_SIZE_SPACED * BOARD_COLS;
	__this.world.bringToTop(groupeLineH);
	__this.world.bringToTop(groupeLineV);
	__this.world.bringToTop(groupeObject2);
	////console.log("groupeObject2",groupeObject2);
	removeKilledGems();

	var dropGemDuration = dropGems();

	// delay board refilling until all existing groupeObject2 have dropped down
	__this.time.events.add(dropGemDuration * speed, refillBoard);
	//__this.time.events.add(speed, function(){//console.log("yes yes yes")});

	allowInput2 = false;


}




// look for groupeObject2 with empty space beneath them and move them down ====>time 
function dropGems() {

	var dropRowCountMax = 0;

	for (var i = 0; i < BOARD_COLS; i++) {
		var dropRowCount = 0;

		for (var j = BOARD_ROWS - 1; j >= 0; j--) {
			var gem = getGem(i, j);

			if (gem === null) {

				dropRowCount++;
				////console.log("dropRowCount",dropRowCount);
			} else if (dropRowCount > 0) {
				gem.dirty = true;
				setObjectPos(gem, gem.posX, gem.posY + dropRowCount);
				tweenGemPos(gem, gem.posX, gem.posY, dropRowCount);
			}
		}

		dropRowCountMax = Math.max(dropRowCount, dropRowCountMax);
	}

	return dropRowCountMax;

}









// look for any empty spots on the board and spawn new groupeObject2 in their place that fall down from above
function refillBoard() {

	var maxGemsMissingFromCol = 0;

	for (var i = 0; i < BOARD_COLS; i++) {
		var gemsMissingFromCol = 0;

		for (var j = BOARD_ROWS - 1; j >= 0; j--) {
			var gem = getGem(i, j);

			if (gem === null) {
				scorrre++;
				text.text = scorrre;
				gemsMissingFromCol++;
				gem = groupeObject2.getFirstDead();
				gem.reset((i * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_x, (-gemsMissingFromCol * FRAME_SIZE_SPACED) + FRAME_SIZE_SPACED * space_grid_y);
				gem.dirty = true;
				randomizeGemColor(gem);
				// var animF=gem.frame;
				// animationObject[i+j* BOARD_COLS]=gem.animations.add("test",[animF,animF+1,animF+2,animF+3,animF+4,animF+5,animF+6],frameSpeed,true);
				//animationObject[i+j* BOARD_COLS].play();
				setObjectPos(gem, i, j);
				tweenGemPos(gem, gem.posX, gem.posY, gemsMissingFromCol * 2);
			}
		}

		maxGemsMissingFromCol = Math.max(maxGemsMissingFromCol, gemsMissingFromCol);
	}

	__this.time.events.add(maxGemsMissingFromCol * 2 * speed, boardRefilled);


}



var dead = 0;
// when the board has finished refilling, re-enable player input   ???
function boardRefilled() {
	//__this.time.events.add(1000,deadpool);
	deadpool();
	// removeKilledGems();
	// var dropGemDuration = dropGems();
	//console.log("dropGemDuration",dropGemDuration);
	// if(pool==1){
	// __this.time.events.add(dropGemDuration * speed, refillBoard);
	// }
	// else{
	// allowInput2=true;
	// }

	__this.time.events.add(frameSpeedMSeconde + 50, function () {
		removeKilledGems();
		var dropGemDuration = dropGems();
		console.log("dropGemDuration", dropGemDuration);
		if (pool == 1) {
			__this.time.events.add(dropGemDuration * speed, refillBoard);
		} else {
			if(scorrre>GameOne.mainObjects.score[GameOne.mainObjects.currentLvl]){
				console.log("update vlv");
				if(GameOne.mainObjects.lvl==GameOne.mainObjects.currentLvl){
					GameOne.mainObjects.lvl+=1;
					endLvl();
				}
			}else{
				allowInput2 = true;
			}	
		}

	});
}




//-------------------------------------------------------------
//-------------------------------------------------------------
//--------------My Code----------------------------------------



function moveObject(coffX, coffY) {
	var px = ourObject.posX;
	var py = ourObject.posY;
	newObject = getGem(ourObject.posX + (1 * coffX), ourObject.posY + (1 * coffY));
	if (ourObject.y == objectY2 && ourObject.x == objectX2) {
		newObject2X = ourObject.x + (FRAME_SIZE_SPACED * coffX);
		newObject2Y = ourObject.y + (FRAME_SIZE_SPACED * coffY);
		idX = ourObject.posX + (1 * coffX);
		idY = ourObject.posY + (1 * coffY);
	} else {
		newObject2X = ourObject.x;
		newObject2Y = ourObject.y;
		idX = ourObject.posX;
		idY = ourObject.posY;
	}
	ourObject.y = ourObject.y + (1 * coffY);
	ourObject.x = ourObject.x + (1 * coffX);

	tw1 = __this.add.tween(ourObject).to({
		x: ourObject.x + (coffX * FRAME_SIZE_SPACED) - (1 * coffX),
		y: ourObject.y + (coffY * FRAME_SIZE_SPACED) - (1 * coffY)
	}, speed, Phaser.Easing.Linear.None, true);
	tw2 = __this.add.tween(newObject).to({
		x: ourObject.x - (1 * coffX),
		y: ourObject.y - (1 * coffY)
	}, speed, Phaser.Easing.Linear.None, true);
	setObjectPos(newObject, px, py);
	setObjectPos(ourObject, px + (1 * coffX), py + (1 * coffY));
}

//function test qui on l'appele lorsque on joue avec la souris  
//changer les places des objets avec les animations (tween)
function mouseMove(pointer, x, y) {
	if (onObject2 && ourObject.x % FRAME_SIZE_SPACED == 0 && ourObject.y % FRAME_SIZE_SPACED == 0) {
		//console.log("Move",__this.input.mousePointer.x,__this.input.mousePointer.y,x,y);
		groupeObject2.bringToTop(ourObject);
		if (x < ourObject.x && ourObject.y == objectY2) {
			if (ourObject.x >= objectX2 && ourObject.posX > 0) {
				moveObject(-1, 0);
			}
		}
		if (x > ourObject.x + FRAME_SIZE_SPACED && ourObject.y == objectY2) {
			if (ourObject.x <= objectX2 && ourObject.posX < BOARD_COLS - 1) {
				moveObject(1, 0);
			}
		}
		if (y < ourObject.y && ourObject.posY > 0) {
			if (ourObject.y >= objectY2 && ourObject.x == objectX2) {
				moveObject(0, -1);
			}
		}
		if (y > ourObject.y + FRAME_SIZE_SPACED && ourObject.x == objectX2) {
			if (ourObject.y <= objectY2 && ourObject.posY < BOARD_ROWS - 1) {
				moveObject(0, 1);
			}
		} else {

		}
	}

}


//function on l'appele lorsuqe on click-down sur un objet
function onObjectInputDown(gem0) {

	//console.log("down",gem.x%FRAME_SIZE_SPACED,gem.y%FRAME_SIZE_SPACED,gem.x,gem.y);
	if (allInPlace() && allowInput2) {
		objectToDeathX = [];
		objectToDeathX2 = [];
		objectToDeathY = [];
		objectToDeathY2 = [];
		//console.log("down");
		onObject2 = true;
		objectX2 = gem0.x;
		objectY2 = gem0.y;
		testPosX = gem0.posX;
		testPosY = gem0.posY;
		ourObject = gem0;
	}
}

//function on l'appele lorsque on click-up de l'objet 
function onObjectInputUp() {
	var touchWithKills=0;
	if (onObject2) {
		if (ourObject.x !== objectX2 || ourObject.y !== objectY2) {
			////console.log("==>",idX,idY,testPosX,testPosY);
			var o1 = check(ourObject.posX, ourObject.posY, ourObject.frame, objectToDeathX, objectToDeathY);
			var o2 = check(newObject.posX, newObject.posY, newObject.frame, objectToDeathX2, objectToDeathY2);
			//console.log("Why so serious",o1,o2);
			if (o1 || o2) {
				let lenX = objectToDeathX.length;
				let lenX2 = objectToDeathX2.length;
				let lenY = objectToDeathY.length;
				let lenY2 = objectToDeathY2.length;
				//console.log("omg  omg",lenX,lenX2,lenY,lenY2);
				allowInput2 = false;
				if (lenX > 3) {
					for (let i = 0; i < lenX; i++) {

						//console.log("why x");
						var anim;
						var animF = objectToDeathX[i].frame;
						anim = objectToDeathX[i].animations.add("test", [animF, animF + 1, animF + 2, animF + 3, animF + 4, animF + 5, animF + 6], frameSpeed, false);
						anim.play();
						touchWithKills=1;
						__this.time.events.add(frameSpeedMSeconde, function () {
							objectToDeathX[i].kill();
						});
						//
					}
				}


				if (lenX2 > 3) {
					for (let i = 0; i < lenX2; i++) {
						//console.log("why x2");
						var anim;
						var animF = objectToDeathX2[i].frame;
						anim = objectToDeathX2[i].animations.add("test", [animF, animF + 1, animF + 2, animF + 3, animF + 4, animF + 5, animF + 6], frameSpeed, false);
						anim.play();
						touchWithKills=1;
						__this.time.events.add(frameSpeedMSeconde, function () {
							objectToDeathX2[i].kill();
						});
					}
				}


				if (lenY > 3) {
					for (let i = 0; i < lenY; i++) {
						//console.log("why Y");
						var anim;
						var animF = objectToDeathY[i].frame;
						anim = objectToDeathY[i].animations.add("test", [animF, animF + 1, animF + 2, animF + 3, animF + 4, animF + 5, animF + 6], frameSpeed, false);
						anim.play();
						touchWithKills=1;
						__this.time.events.add(frameSpeedMSeconde, function () {
							objectToDeathY[i].kill();
						});
					}
				}


				if (lenY2 > 3) {
					for (let i = 0; i < lenY2; i++) {
						//console.log("why Y2");
						var anim;
						var animF = objectToDeathY2[i].frame;
						anim = objectToDeathY2[i].animations.add("test", [animF, animF + 1, animF + 2, animF + 3, animF + 4, animF + 5, animF + 6], frameSpeed, false);
						anim.play();
						touchWithKills=1;
						__this.time.events.add(frameSpeedMSeconde, function () {
							objectToDeathY2[i].kill();
						});
					}
				}

				__this.time.events.add(frameSpeedMSeconde + 50, function () {
					removeKilledGems();
					//var dropGemDuration = dropGems();
					var dropGemDuration;
					__this.time.events.add(100, function () {
						dropGemDuration = dropGems();
						//console.log("dropGemDuration",dropGemDuration);
						__this.time.events.add(dropGemDuration * speed, refillBoard);
					});

				});



			} else {

				__this.tweens.remove(tw1);
				__this.tweens.remove(tw2);
				__this.add.tween(newObject).to({
					x: newObject2X,
					y: newObject2Y
				}, speed, Phaser.Easing.Linear.None, true);
				__this.add.tween(ourObject).to({
					x: objectX2,
					y: objectY2
				}, speed, Phaser.Easing.Linear.None, true);
				setObjectPos(newObject, idX, idY);
				setObjectPos(ourObject, testPosX, testPosY);
			}
		}
	}
	if(touchWithKills==1){
		console.log("moves");
		moves.text=parseInt(moves.text)-1;
	}
	onObject2 = false;
	//

}



function allInPlace() {
	var value = true;
	groupeObject2.forEach(function (gem) {
		if (gem.x % FRAME_SIZE_SPACED != 0 || gem.y % FRAME_SIZE_SPACED != 0) {
			value = false;
		}
	});
	////console.log("forEach",value);
	return value;
}



function deadpool() {

	pool = 0;
	for (let i = 0; i < BOARD_COLS; i++) {
		for (let j = 0; j < BOARD_ROWS; j++) {
			////console.log("se",getGem(i,j));
			if (check(i, j, getGem(i, j).frame, objectToDeathX, objectToDeathY)) {
				let lenX = objectToDeathX.length;
				let lenY = objectToDeathY.length;
				////console.log("omg  omg omg",lenX,lenY);

				if (lenX > 3) {
					for (let i = 0; i < lenX; i++) {
						goToDeath(objectToDeathX[i]);
					}
					pool = 1;
				}
				if (lenY > 3) {
					for (let i = 0; i < lenY; i++) {
						goToDeath(objectToDeathY[i]);
					}
					pool = 1;
				}
			}
			objectToDeathX = [];
			objectToDeathY = [];
		}
	}
}

function goToDeath(o) {
	var obj = o;
	var anim;
	var animF = o.frame;
	anim = o.animations.add("test", [animF, animF + 1, animF + 2, animF + 3, animF + 4, animF + 5, animF + 6], frameSpeed, false);
	anim.play();
	__this.time.events.add(frameSpeedMSeconde, function () {
		obj.kill();
	});
}

function check(x, y, f, oX, oY) {

	var omg = jinx0(x, y, f, oX) + jinxM(x, y, f, oX);
	var omg2 = jiny0(x, y, f, oY) + jinyM(x, y, f, oY); //
	////console.log("loll",omg,omg2,"frame",f);
	if (omg > MATCH_MIN)
		return true;
	if (omg2 > MATCH_MIN)
		return true;
	return false;


}

function rangFOR(f1, f2) {
	var r1 = f1 % 7;
	var r2 = f2 % 7;
	if (f1 - r1 != f2 - r2)
		return true;

	return false;
}

function jinx0(x, y, frm, ob) {
	var o = getGem(x, y);
	//console.log("loll",o.frame,"frame",frm);
	if (rangFOR(o.frame, frm))
		return 0;

	ob.push(o);
	if (x - 1 >= 0) {
		return 1 + jinx0(x - 1, y, frm, ob);
	} else {
		return 1;
	}
}

function jinxM(x, y, frm, ob) {
	var o = getGem(x, y);
	//console.log("loll",o.frame,"frame",frm);
	if (rangFOR(o.frame, frm))
		return 0;

	ob.push(o);
	if (x + 1 < BOARD_COLS) {
		return 1 + jinxM(x + 1, y, frm, ob);
	} else {
		return 1;
	}
}

function jiny0(x, y, frm, ob) {
	var o = getGem(x, y);
	//console.log("loll",o.frame,"frame",frm);
	if (rangFOR(o.frame, frm))
		return 0;

	ob.push(o);
	if (y - 1 >= 0) {
		return 1 + jiny0(x, y - 1, frm, ob);
	} else {
		return 1;
	}
}

function jinyM(x, y, frm, ob) {
	var o = getGem(x, y);
	//console.log("loll",o.frame,"frame",frm);
	if (rangFOR(o.frame, frm))
		return 0;

	ob.push(o);
	if (y + 1 < BOARD_ROWS) {
		return 1 + jinyM(x, y + 1, frm, ob);
	} else {
		return 1;
	}
}


function restart() {
	//console.log("oo");
	// res.inputEnabled = false;
	onObject2 = false; // onObject2===true if the mouse on click on Object
	allowInput2 = false;
	objectToDeathX = [];
	objectToDeathX2 = [];
	objectToDeathY = [];
	objectToDeathY2 = [];
	pool = 0;
	scorrre = -25;
	text.text = 0;
	groupeObject2.removeAll();
	spawnBoard();
}