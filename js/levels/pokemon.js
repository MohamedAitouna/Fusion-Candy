var GameOne =GameOne||{};


GameOne.GamePokemon=function(){};
GameOne.GamePokemon.prototype={
	preload:function(){
		__this=this;
		spreetObject="candies";
		init();
		console.log("hello the level :",numbOfFram);
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
		movesBar=this.add.sprite(0,backScorr.height+20, 'backScorr');
		//barLifes=this.add.sprite(this.game.width, 0, 'backScorr');
		//barLifes.anchor.setTo(1,0);
		for(let i=0;i<3;i++){
			let k=i-1;
			let y=(k*50)+(this.game.width/2)
			life=this.add.sprite(y,5, 'life');
			life.anchor.setTo(0.5,0);
			life.scale.setTo(0.6);
		}

		spawnBoard();
		this.input.addMoveCallback(mouseMove, this);
	
	
		backB.inputEnabled = true;
		backB.events.onInputDown.add(backk, this);
		backB.events.onInputUp.add(backu, this);
		backB.anchor.setTo(0.9,0.7);
	
		text = this.add.text(this.game.width/6, 10, "0");
		text.addColor('#ffffff',0);

		moves = this.add.text(10+this.game.width/6,backScorr.height+30,GameOne.mainObjects.moves[GameOne.mainObjects.currentLvl]);
		moves.addColor('#ffffff',0);

		scoreLabel=this.add.text(40, 10, "Score :");
		scoreLabel.addColor('#ffffff',0);

		moveLabel=this.add.text(40, backScorr.height+30, "Moves :");
		moveLabel.addColor('#ffffff',0);

	this.paused = false;
		
	},
	update:function(){},	
}
