/***********************************Hidoka ***** 04 ******************************
 @MainMenu State
 The main menu of the Game 
 
 
**********************************************************************************/

GameOne =GameOne||{};

GameOne.MainMenu=function(){};
var _this2;

GameOne.MainMenu.prototype={
	create:function(){
		console.log("Hello MainMenu");
		_this2=this;
		
		//set the background image
		this.backImage=this.add.sprite(0,0,'background');
		this.backImage.height=this.game.height;
		this.backImage.width=this.game.width;
		
		//console.log("height and width",this.game.height,this.game.width,this.game.world.width,this.game.height);
		
		this.logoCandy=this.add.sprite(this.game.world.centerX,50,'logoC');
		this.logoCandy.anchor.setTo(0.5,0);
				
		var ratio=this.logoCandy.heigh/this.logoCandy.width
		this.logoCandy.scale.setTo(0.5, 0.5*ratio);

		

		let h1=this.game.height/2;
		let h2=this.game.height/2+200;
		
		this.lolB=this.add.sprite(this.game.world.centerX,h2,'playMenu');
		this.lolB.anchor.setTo(0.5);
				
		this.lolB.width=this.game.width/3;
		this.lolB.height=this.game.height/10;;

		this.lolB.inputEnabled=true;
		this.lolB.events.onInputDown.add(onObjectInputDown3, this);
        this.lolB.events.onInputUp.add(onObjectInputUp3, this);
		
		music = this.game.add.audio('test');
        //music.play();
		// music.pause();
	},
	update:function(){}	
}
function onObjectInputDown3(){
	//_this2.lolB.loadTexture('playBD', 0)
}

function onObjectInputUp3(){
	_this2.state.start('Levels');
}