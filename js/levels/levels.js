/***********************************Hidoka ***** 04 ******************************
 @Levels State
 Map of levels
 
 
**********************************************************************************/



var GameOne =GameOne||{};


var FRAME_SIZE = 65;    //size of frame (sprit or gem)
var FRAME_SPACING = 8;  //space between fgem
var FRAME_SIZE_SPACED = FRAME_SIZE + FRAME_SPACING;
var space_grid_x=1;
var space_grid_y=1;
var BOARD_COLS=7;
var BOARD_ROWS=7;
var MATCH_MIN =3; // min number of same color groupeObject2 required in a row to be considered a match
var numbOfFram=4;
var star;
var ratioW=[230/838,590/838,400/838,220/838,470/838,680/838,610/838];
var ratioH=[72/80,67/80,48/80,36/80,24/80,19/80,55/80];


var ratioDW=[70/838,150/838,10/838,420/838,640/838,380/838,610/838];
var ratioDH=[8/80,47/80,30/80,3/80,50/80,32/80,55/80];
var speedEfecct=8;
var __thisLevels;

var numStar=0;
GameOne.Levels=function(){};
GameOne.Levels.prototype={
	preload:function(){
		__thisLevels=this;
		console.log("hello preload level");
	},
	create:function(){
		this.backImage=this.add.sprite(0,0,'background');
		this.backImage.height=this.game.height;
		this.backImage.width=this.game.width;
		
		//  Create a group
		star = this.add.group();
	    for(let i=0;i<10;i++){	
		var key =star.create(__thisLevels.game.world.randomX, __thisLevels.game.world.randomY,'star');
		key.scale.setTo(0);
		key.anchor.setTo(0.5);
		this.add.tween(key.scale).to( { x: 0.7, y: 0.7 }, 3000, Phaser.Easing.Quartic.InOut, true, 0,10, true);
		}

		//  Add 5 sprites to it - the 'false' parameter sets them all to dead
		// star.createMultiple(5, 'veg', 0, false);

    //  Set-up a simple repeating timer
		this.time.events.repeat(Phaser.Timer.SECOND, 20, resurrect, this);
		
		this.roadGame=this.add.sprite(0,0,'road');
		this.roadGame.height=this.game.height;
		this.roadGame.width=this.game.width;
		groupeLevel = this.add.group();

		
		
		
		this.level1E=this.add.sprite(this.game.width*ratioW[0],this.game.height*ratioH[0],'effects');
	    this.level1E.anchor.setTo(0.5);
	    this.level1E.frame=0;
		this.add.tween(this.level1E.scale).to( { x: 0.7, y: 0.7 }, 1500, Phaser.Easing.Quartic.InOut, true, 0,10, true);
		// var animationEffect=this.level1E.animations.add("effects",[0,1,2,3,2,1,0],speedEfecct,true);
		// animationEffect.play();
		for(let i=1;i<6;i++){
		 putLevelsEffect(i)
		}		
		groupeLevels =this.add.group();
		for(let i=0;i<7;i++){
		 putLevels(groupeLevels,i)
		}		
		
		  var lvl,w,h,rr;
	      lvl=this.add.sprite(this.game.width*ratioDW[0],this.game.height*ratioDH[0],'candy');
		   w=lvl.width;
		   h=lvl.height;
		   rr=w/h;
		  // lvl.width=w*this.game.width/834;
		  lvl.width=w*this.game.height/838;
		  lvl.height=lvl.width/rr;
		  console.log("lvl",lvl.height,lvl.width);
	
	       lvl=this.add.sprite(this.game.width*ratioDW[1],this.game.height*ratioDH[1],'candy2');
		   w=lvl.width;
		   h=lvl.height;
		   rr=w/h;
		   lvl.height=h*this.game.height/800;
		   lvl.width=lvl.height*rr;
		   // lvl.width=lvl.width*this.game.width/834;
		   // lvl.height=lvl.height*this.game.height/800;
		   console.log("lvl",lvl.height,lvl.width);

	      // lvl=this.add.sprite(this.game.width*ratioDW[2],this.game.height*ratioDH[2],'candy3');
		   // lvl.width=lvl.width*this.game.width/834;
		  // lvl.height=lvl.height*this.game.height/800;

	      // lvl=this.add.sprite(this.game.width*ratioDW[3],this.game.height*ratioDH[3],'candy4');
		   // lvl.width=lvl.width*this.game.width/834;
		  // lvl.height=lvl.height*this.game.height/800;

	      // lvl=this.add.sprite(this.game.width*ratioDW[4],this.game.height*ratioDH[4],'candy5');
		   // lvl.width=lvl.width*this.game.width/834;
		  // lvl.height=lvl.height*this.game.height/800;

	      // lvl=this.add.sprite(this.game.width*ratioDW[5],this.game.height*ratioDH[5],'candy6');
		  // lvl.width=lvl.width*this.game.width/834;
		  // lvl.height=lvl.height*this.game.height/800;

		  

		backB=this.add.sprite(this.game.width, this.game.height, 'back');
		backB.anchor.setTo(0.9,0.7);
	},
	update:function(){}
}

function onLevel1InputDown(item){
	
	console.log("hello down Level1",item.valI);
}
function onLevel1InputUp(item){
		if(item.valI==0){
		 __thisLevels.state.start('pokemon');
		}
	else{
	__thisLevels.state.start('digimon');
	}
	console.log("hello Up Level1");
}


//function put every level image in a postion 
function putLevels(objetGroup,i){
		var lvl;
		lvl=objetGroup.create(__thisLevels.game.width*ratioW[i],__thisLevels.game.height*ratioH[i],'levels');
		lvl.frame=(2*i)+1;
	    lvl.anchor.setTo(0.5);
	    //lvl.scale.setTo(0.95);
		lvl.inputEnabled=true;
		lvl.events.onInputDown.add(onLevel1InputDown, __thisLevels);
        lvl.events.onInputUp.add(onLevel1InputUp, __thisLevels);
		lvl.valI=i;
}

function putLevelsEffect(i){
		var lo;
		lo=__thisLevels.add.sprite(__thisLevels.game.width*ratioW[i],__thisLevels.game.height*ratioH[i],'effects');
	    lo.anchor.setTo(0.5);
	    lo.frame=0;
}
function resurrect() {

    //  Get a dead item - The Group was seeded with 5 'dead' items,
    //  so those will be re-used first and then it will start
    //  creating new ones using the following arguments:
   if(numStar<20){
	   numStar++;
    var key =star.create(__thisLevels.game.world.randomX, __thisLevels.game.world.randomY,'star');
	key.scale.setTo(0);
	key.anchor.setTo(0.5);
   __thisLevels.add.tween(key.scale).to( { x: 0.7, y: 0.7 }, 3000, Phaser.Easing.Quartic.InOut, true, 0,10, true);}
	
   

}