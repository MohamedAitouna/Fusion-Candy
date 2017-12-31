/***********************************Hidoka ***** 04 ******************************
* @Preload State
* the game assets (images, spritsheets, etc) are load into the memory
* the preloading screen is shown to the user, which includes a loading bar to show the progress.
* 
*
**********************************************************************************/


var GameOne=GameOne||{};

var FRAME_SIZE = 65;   
var FRAME_SPACING = 8;  
var FRAME_SIZE_SPACED = FRAME_SIZE + FRAME_SPACING;



GameOne.Preload=function(){};

GameOne.Preload.prototype={
	preload:function(){
		
		
	    this.logo=this.add.sprite(this.game.world.centerX,10,'fusion');
		this.logo.anchor.setTo(0.5,0);
		
		//set the logo of the game size
		var ratio=this.logo.heigh/this.logo.width
		this.logo.scale.setTo(0.4, 0.4*ratio);

		text = this.add.text(this.game.world.centerX,this.logo.height+30, "Chargement");
		text.addColor('#3b225c',0);
		text.anchor.setTo(0.5);
		
		this.preloadBar=this.add.sprite(this.game.world.centerX,this.logo.height+60,'loader');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);
		
		
		this.load.image('background','assets/img/background.png');
		
		this.load.image('playBD','assets/img/playDown.png');
		this.load.image('playMenu','assets/img/playCandy.png');
		this.load.image('logoCandy','assets/img/logo-candy .png');
		this.load.image('logoC','assets/img/_logocandy.png');
		
		this.load.image('road','assets/img/chemin.png');
		this.load.image('star','assets/img/star.png');
		
		this.load.spritesheet("levels", "assets/img/allLevels.png", 100, 100,14);
		this.load.spritesheet("effects", "assets/img/effects.png", 150, 150,4);

	
		this.load.image('candy','assets/img/deco1.png');
		this.load.image('candy2','assets/img/deco2.png');
		this.load.image('candy3','assets/img/deco3.png');
		this.load.image('candy4','assets/img/deco4.png');
		this.load.image('candy5','assets/img/deco5.png');
		this.load.image('candy6','assets/img/deco6.png');
			

		
		this.load.image('backobj', 'assets/img/backObject.png');
		this.load.image('backScorr', 'assets/img/backScorr.png');
		this.load.image('lineV', 'assets/img/lineV.png');
		this.load.image('lineH', 'assets/img/lineH.png');
	
		this.load.image('back', 'assets/img/res.png');
		this.load.image('back0', 'assets/img/res0.png');
		this.load.spritesheet("digimons", "assets/img/all.png", FRAME_SIZE, FRAME_SIZE);
		this.load.spritesheet("candies", "assets/img/candyProject.png", FRAME_SIZE, FRAME_SIZE,63);
		
		
		this.load.audio('test',['assets/audio/pokemon.m4a']);
	},	
	create:function(){
		console.log("Hello Preload");
		var t=this;
		this.time.events.add(100, function(){
			t.state.start('MainMenu');
		});
		
	}
};