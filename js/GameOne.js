GameOne =GameOne||{};

var FRAME_SIZE = 64;    //size of frame (sprit or gem)
var FRAME_SPACING = 4;  //space between fgem
var FRAME_SIZE_SPACED = FRAME_SIZE + FRAME_SPACING;
var BOARD_COLS=6;
var BOARD_ROWS=6;
var MATCH_MIN =3; // min number of same color groupeObject required in a row to be considered a match

var groupeObject;
var allowInput;
var onObject=false; // onObject===true if the mouse on click on Object
var objectX;
var objectY;
var newObjectX;
var newObjectY;
var idX;
var idY;

var ourObject;
var newObject;
var tw1;
var tw2;

var objectToDeathX=[];
var objectToDeathX2=[];
var objectToDeathY=[];
var objectToDeathY2=[];
var pool=0;

var speed=150;

var text;
var scorrre=-25;


function init(){
	
 onObject=false;
 pool=0;
 speed=150;
 scorrre=-25;
}

var _this;
GameOne.Game=function(){};
GameOne.Game.prototype={
	preload:function(){
		_this=this;
		init();
	},
	create:function(){
		this.game.stage.backgroundColor='#000';
		back=this.add.sprite(0, 0, 'backdrop');
		back.width=this.scale.width;
		back.height=this.scale.height;
		back.alpha=0.2;
	
	
		res=this.add.sprite(550,200, 'restart');
		res.width=100;
		res.height=100;
		backB=this.add.sprite(550, 50, 'back');
		backB.width=100;
		backB.height=100;
	
		spawnBoard();
		this.input.addMoveCallback(mouseMove, this);
	
		res.inputEnabled = false;
		res.events.onInputDown.add(restart, this);
		backB.inputEnabled = true;
		backB.events.onInputDown.add(backk, this);
	
		text = this.add.text(20, 20, "0");
		text.addColor('#ffff00',0);

	this.paused = false;
		
	},
	update:function(){},	
}

function backk() {    
    //pass it the score as a parameter 
    _this.game.state.start('MainMenu', true, false);
}



//-----------------------------------------------------------------------------------------------------------------
//---------------------------------------------Helpful functions---------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------


// find a object on the board according to its position on the board
function getGem(posX, posY) {
		var omg=groupeObject.iterate("id", calcObjectId(posX, posY), Phaser.Group.RETURN_CHILD);
        return omg;

}

// since the groupeObject are a spritesheet, their color is the same as the current frame number
function getGemColor(gem) {
    return gem.frame;
}

// set the object spritesheet to a random frame
function randomizeGemColor(gem) {
    gem.frame = _this.rnd.integerInRange(0, gem.animations.frameTotal - 1);
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

// move groupeObject that have been killed off the board
function removeKilledGems() {
    groupeObject.forEach(function(gem) {
        if (!gem.alive) {
            setObjectPos(gem, -1,-1);
        }
    });
}



//--------------------------------------------------------------------------------------
//-----------------------------------------------Bigg functions XD XD-------------------
//--------------------------------------------------------------------------------------


// animated OBJECT movement
function tweenGemPos(gem, newPosX, newPosY, durationMultiplier) {

   // console.log('Tween ',gem.name,' from ',gem.posX, ',', gem.posY, ' to ', newPosX, ',', newPosY);
    if (durationMultiplier === null || typeof durationMultiplier === 'undefined')
    {
        durationMultiplier = 1;
    }

    return _this.add.tween(gem).to({x: (newPosX  * FRAME_SIZE_SPACED)+FRAME_SIZE_SPACED, y: (newPosY * FRAME_SIZE_SPACED)+FRAME_SIZE_SPACED}, speed * durationMultiplier, Phaser.Easing.Linear.None, true);

}



// fill the screen with as many groupeObject as possible
function spawnBoard() {
	console.log("looo gameONE");
	
    groupeObject = _this.add.group();
	
    for (var i = 0; i < BOARD_COLS; i++)
    {
        for (var j = 0; j < BOARD_ROWS; j++)
        {
			//background of objects
			_this.add.sprite((i*FRAME_SIZE_SPACED)+FRAME_SIZE_SPACED,(j*FRAME_SIZE_SPACED)+FRAME_SIZE_SPACED, 'backobj');
			
            var gem = groupeObject.create((i * FRAME_SIZE_SPACED)+FRAME_SIZE_SPACED, (j * FRAME_SIZE_SPACED)+FRAME_SIZE_SPACED, "GEMS");
            gem.name = 'gem' + i.toString() + 'x' + j.toString();
            gem.inputEnabled = true;
            gem.events.onInputDown.add(onObjectInputDown, _this);
            gem.events.onInputUp.add(onObjectInputUp, _this);
            randomizeGemColor(gem);
            setObjectPos(gem, i, j); // each gem has a position on the board
            gem.kill();
        }
    }
	//console.log("groupeObject",groupeObject);
    removeKilledGems();

    var dropGemDuration = dropGems();

    // delay board refilling until all existing groupeObject have dropped down
    _this.time.events.add(dropGemDuration * speed, refillBoard);
	//_this.time.events.add(speed, function(){console.log("yes yes yes")});
	
    allowInput = false;


}




// look for groupeObject with empty space beneath them and move them down ====>time 
function dropGems() {

    var dropRowCountMax = 0;

    for (var i = 0; i < BOARD_COLS; i++)
    {
        var dropRowCount = 0;

        for (var j = BOARD_ROWS - 1; j >= 0; j--)
        {
            var gem = getGem(i, j);

            if (gem === null)
            {
				
                dropRowCount++;
				//console.log("dropRowCount",dropRowCount);
            }
            else if (dropRowCount > 0)
            {
                gem.dirty = true;
                setObjectPos(gem, gem.posX, gem.posY + dropRowCount);
                tweenGemPos(gem, gem.posX, gem.posY, dropRowCount);
            }
        }

        dropRowCountMax = Math.max(dropRowCount, dropRowCountMax);
    }

    return dropRowCountMax;

}









// look for any empty spots on the board and spawn new groupeObject in their place that fall down from above
function refillBoard() {
	
    var maxGemsMissingFromCol = 0;

    for (var i = 0; i < BOARD_COLS; i++)
    {
        var gemsMissingFromCol = 0;

        for (var j = BOARD_ROWS - 1; j >= 0; j--)
        {
            var gem = getGem(i, j);

            if (gem === null)
            {
				 scorrre++;
				text.text=scorrre;

                gemsMissingFromCol++;
                gem = groupeObject.getFirstDead();
                gem.reset((i * FRAME_SIZE_SPACED)+FRAME_SIZE_SPACED, (-gemsMissingFromCol * FRAME_SIZE_SPACED)+FRAME_SIZE_SPACED);
                gem.dirty = true;
                randomizeGemColor(gem);
                setObjectPos(gem, i, j);
                tweenGemPos(gem, gem.posX, gem.posY, gemsMissingFromCol * 2);
            }
        }

        maxGemsMissingFromCol = Math.max(maxGemsMissingFromCol, gemsMissingFromCol);
    }

    _this.time.events.add(maxGemsMissingFromCol * 2 * speed, boardRefilled);
	

}



var dead=0;
// when the board has finished refilling, re-enable player input   ???
function boardRefilled() {
	//_this.time.events.add(1000,deadpool);
	deadpool();
	removeKilledGems();
	var dropGemDuration = dropGems();
	console.log("dropGemDuration",dropGemDuration);
	if(pool==1){
	_this.time.events.add(dropGemDuration * speed, refillBoard);
	}
	else{
		res.inputEnabled = true;
		allowInput=true;
	}
}




//-------------------------------------------------------------
//-------------------------------------------------------------
//--------------My Code----------------------------------------



function moveObject(coffX,coffY){
	var px=ourObject.posX;
	var py=ourObject.posY;
	newObject=getGem(ourObject.posX+(1*coffX),ourObject.posY+(1*coffY));
	if(ourObject.y==objectY && ourObject.x==objectX ){
		newObjectX=ourObject.x+(FRAME_SIZE_SPACED*coffX);
		newObjectY=ourObject.y+(FRAME_SIZE_SPACED*coffY);
		idX=ourObject.posX+(1*coffX);
		idY=ourObject.posY+(1*coffY);
		}else{
		newObjectX=ourObject.x;
		newObjectY=ourObject.y;
		idX=ourObject.posX;
		idY=ourObject.posY;
		}
		ourObject.y=ourObject.y+(1*coffY);
		ourObject.x=ourObject.x+(1*coffX);
	
		tw1=_this.add.tween(ourObject).to({x:ourObject.x+(coffX*FRAME_SIZE_SPACED)-(1*coffX),y: ourObject.y+(coffY*FRAME_SIZE_SPACED)-(1*coffY)}, speed, Phaser.Easing.Linear.None, true);
		tw2=_this.add.tween(newObject).to({x:ourObject.x-(1*coffX),y: ourObject.y-(1*coffY)}, speed, Phaser.Easing.Linear.None, true);
		setObjectPos(newObject,px, py);
		setObjectPos(ourObject,px+(1*coffX), py+(1*coffY));
		}

//function test qui on l'appele lorsque on joue avec la souris  
//changer les places des objets avec les animations (tween)
function mouseMove(pointer, x, y){
	if(onObject && ourObject.x%FRAME_SIZE_SPACED==0 && ourObject.y%FRAME_SIZE_SPACED==0){
		groupeObject.bringToTop(ourObject);
		if(_this.input.mousePointer.x<ourObject.x && ourObject.y==objectY){
			if(ourObject.x>=objectX && ourObject.posX>0){
				moveObject(-1,0);
			}
		}
		else if(_this.input.mousePointer.x>ourObject.x+FRAME_SIZE_SPACED && ourObject.y==objectY){
			if(ourObject.x<=objectX && ourObject.posX<BOARD_COLS-1){
				moveObject(1,0);
			}
		}
		else if(_this.input.mousePointer.y<ourObject.y && ourObject.posY>0 ){
			if(ourObject.y>=objectY && ourObject.x==objectX){
				moveObject(0,-1);
			}
		}
		else if (_this.input.mousePointer.y>ourObject.y+FRAME_SIZE_SPACED && ourObject.x==objectX){
			if(ourObject.y<=objectY && ourObject.posY<BOARD_ROWS-1){
				moveObject(0,1);
			}
		}else{
		
		}	
	}

}


//function on l'appele lorsuqe on click-down sur un objet
function onObjectInputDown(gem){

		console.log("down",gem.x%FRAME_SIZE_SPACED,gem.y%FRAME_SIZE_SPACED,gem.x,gem.y);
	if(allInPlace() && allowInput){
	console.log("down");
	onObject=true;
	objectX=gem.x;
	objectY=gem.y;
	testPosX=gem.posX;
	testPosY=gem.posY;
	ourObject=gem;
	}
}

//function on l'appele lorsque on click-up de l'objet 
function onObjectInputUp(){
	
	if(onObject){
	if(ourObject.x!==objectX || ourObject.y!==objectY ){
		//console.log("==>",idX,idY,testPosX,testPosY);
		var o1=check(ourObject.posX,ourObject.posY,ourObject.frame,objectToDeathX,objectToDeathY);
		var o2=check(newObject.posX,newObject.posY,newObject.frame,objectToDeathX2,objectToDeathY2);
		console.log("Why so serious",o1,o2);
		if( o1 || o2 ){
			let lenX=objectToDeathX.length;
			let lenX2=objectToDeathX2.length;
			let lenY=objectToDeathY.length;
			let lenY2=objectToDeathY2.length;
			console.log("omg  omg",lenX,lenX2,lenY,lenY2);
			
			if(lenX>3){
			  for(let i=0;i<lenX;i++){
				  console.log("why x");
			  objectToDeathX[i].kill();
			  }
			}

		  
			if(lenX2>3){
			for(let i=0;i<lenX2;i++){
					  console.log("why x2");
			objectToDeathX2[i].kill();}
			}

			
			if(lenY>3){
			  for(let i=0;i<lenY;i++){
				  	  console.log("why Y");
			  objectToDeathY[i].kill();}
			}

		  
			if(lenY2>3){
			  for(let i=0;i<lenY2;i++){
				  	  console.log("why Y2");
			  objectToDeathY2[i].kill();}
			}
				allowInput=false;
				removeKilledGems();
				var dropGemDuration = dropGems();
				console.log("dropGemDuration",dropGemDuration);
				_this.time.events.add(dropGemDuration * speed, refillBoard);

		}else{
			
		 _this.tweens.remove(tw1);
		 _this.tweens.remove(tw2); 
	     _this.add.tween(newObject).to({x:newObjectX,y:newObjectY}, speed, Phaser.Easing.Linear.None, true);
	     _this.add.tween(ourObject).to({x: objectX,y:objectY}, speed, Phaser.Easing.Linear.None, true);
		 setObjectPos(newObject,idX, idY);
	     setObjectPos(ourObject, testPosX, testPosY);
		}
		}
	}
			 objectToDeathX=[];
		 objectToDeathX2=[];
		 objectToDeathY=[];
		 objectToDeathY2=[];
	onObject=false;
	//

}



function allInPlace() {
    var value=true;
    groupeObject.forEach(function(gem) {
    if(gem.x%FRAME_SIZE_SPACED!=0 || gem.y%FRAME_SIZE_SPACED!=0){
		value=false;
	}
    });
//console.log("forEach",value);
return value;
}



function deadpool(){
	
	    pool=0;
		for(let i=0;i<BOARD_COLS;i++){
		for(let j=0;j<BOARD_ROWS;j++){
			//console.log("se",getGem(i,j));
			if(check(i,j,getGem(i,j).frame,objectToDeathX,objectToDeathY)){
			let lenX=objectToDeathX.length;
			let lenY=objectToDeathY.length;
			//console.log("omg  omg omg",lenX,lenY);

			if(lenX>3){
			  for(let i=0;i<lenX;i++){
				 // console.log("why x");
			  objectToDeathX[i].kill();
			  }
			  pool=1;
			}
			
			  if(lenY>3){
			  for(let i=0;i<lenY;i++){
				  //console.log("why y");
			  objectToDeathY[i].kill();
			  }
			   pool=1;
			}
			}
			objectToDeathX=[];
			objectToDeathY=[];
		}
	}
}



function check(x,y,f,oX,oY){

	var omg=jinx0(x,y,f,oX)+jinxM(x,y,f,oX);
	var omg2=jiny0(x,y,f,oY)+jinyM(x,y,f,oY);//
	//console.log("loll",omg,omg2,"frame",f);
    if(omg>MATCH_MIN)
	return true;
    if(omg2>MATCH_MIN)
	return true;
    return false;


}

function jinx0(x,y,frm,ob){
	var o=getGem(x,y);
	if(o.frame!=frm)
	return 0;

	ob.push(o);
	if(x-1>=0){
	  return 1+ jinx0(x-1,y,frm,ob);
	}else{
	  return 1;
	}
}

function jinxM(x,y,frm,ob){
	var o=getGem(x,y);
	if(getGem(x,y).frame!=frm)
	return 0;

ob.push(o);
  if(x+1<BOARD_ROWS){
	  return 1+ jinxM(x+1,y,frm,ob);
  }else{
	  return 1;
  }
}

function jiny0(x,y,frm,ob){
	var o=getGem(x,y);
	if(getGem(x,y).frame!=frm)
	return 0;

ob.push(o);
  if(y-1>=0){
	  return 1+ jiny0(x,y-1,frm,ob);
  }else{
	  return 1;
  }
}

function jinyM(x,y,frm,ob){
	var o=getGem(x,y);
	if(getGem(x,y).frame!=frm)
	return 0;

  ob.push(o);
  if(y+1<BOARD_ROWS){
	  return 1+ jinyM(x,y+1,frm,ob);
  }else{
	  return 1;
  }
}


function restart () {
console.log("oo");
res.inputEnabled = false;
onObject=false; // onObject===true if the mouse on click on Object
allowInput=false;
objectToDeathX=[];
objectToDeathX2=[];
objectToDeathY=[];
objectToDeathY2=[];
pool=0;
scorrre=-25;
text.text=0;
groupeObject.removeAll();
 spawnBoard();
}