

GameOne.GameDigimon=function(){};
GameOne.GameDigimon.prototype={
	preload:function(){
		__this=this;
		spreetObject="candies";
		init();
		numbOfFram=5;
		console.log("hello preload level");
	},
	create:function(){
		console.log("Hello digimons");
		this.game.stage.backgroundColor='#000';
		back=this.add.sprite(0, 0, 'background');
		back.width=this.game.width;
		back.height=this.game.height;

		
		// logo=this.add.sprite(0, 0, 'logoC');
		// logo.width=250;
		// logo.height=200;
	
		backB=this.add.sprite(this.game.width, this.game.height, 'back');
		backB.width=100;
		backB.height=100;
		backB.anchor.setTo(1,1);
	
		spawnBoard();
		this.input.addMoveCallback(mouseMove, this);
	
		backB.inputEnabled = true;
		backB.events.onInputDown.add(backk, this);
		backB.events.onInputUp.add(backu, this);
		backB.anchor.setTo(0.9,0.7);
	
		text = this.add.text(20, 20, "0");
		text.addColor('#ffff00',0);

	this.paused = false;
		
	},
	update:function(){},	
}
