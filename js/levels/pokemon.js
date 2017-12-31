var GameOne =GameOne||{};


GameOne.GamePokemon=function(){};
GameOne.GamePokemon.prototype={
	preload:function(){
		__this=this;
		spreetObject="candies";
		init();
		numbOfFram=4;
		console.log("hello preload level");
	},
	create:function(){
		console.log("Hello pokemons");
		this.game.stage.backgroundColor='#000';
		back=this.add.sprite(0, 0, 'background');
		back.width=this.game.width;
		back.height=this.game.height;
		
	
		backB=this.add.sprite(this.game.width, this.game.height, 'back');
		backB.width=100;
		backB.height=100;
		backB.anchor.setTo(1,1);
		
		backScorr=this.add.sprite(0, 0, 'backScorr');
		// backScorr.width=100;
		// backScorr.height=100;
		// backScorr.anchor.setTo(1,1);
	
		spawnBoard();
		this.input.addMoveCallback(mouseMove, this);
	
	
		backB.inputEnabled = true;
		backB.events.onInputDown.add(backk, this);
		backB.events.onInputUp.add(backu, this);
		backB.anchor.setTo(0.9,0.7);
	
		text = this.add.text(this.game.width/6, 10, "0");
		text.addColor('#ffffff',0);

	this.paused = false;
		
	},
	update:function(){},	
}
