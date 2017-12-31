var roadAsset;
var roadAsset1;
var roadAsset2;
var roadAsset3;
var roadAsset4;
var roadAsset5;
var temp=0;
var moto;
var car;
var carI;
var cursors;

var game=new Phaser.Game(480,320,Phaser.AUTO,"renderCanvasPhaser",{
	preload:preload,
	create:create,
	update:update,});
	
	var sprite;

function preload() {

    //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
    game.load.spritesheet('ms', 'assets/img/metalslug_mummy37x45.png', 37, 45, 18);

}

function create() {

    sprite = game.add.sprite(40, 100, 'ms');

    sprite.animations.add('walk');

    sprite.animations.play('walk', 100, true);

   // game.add.tween(sprite).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);

}

//  update isn't called until 'create' has completed. If you need to process stuff before that point (i.e. while the preload is still happening)
//  then create a function called loadUpdate() and use that
function update() {
    
	
  
}
	/*
function preload(){
	
	    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.setMinMax(400, 300, 800, 600);
		//game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
		//that 2 lines are responsible for aligning canvas element horizontally and vertically ==> Always centered on screen regardless of size.
		game.scale.pageAlignHorizontally=true;
		game.scale.pageAlignVertically=true;
		game.stage.backgroundColor = '#eee';
		//loading the road sprite
		game.load.image('road','assets/img/road.png');
		game.load.image('moto','assets/img/moto.png');
		game.load.image('car','assets/img/car.png');
		game.load.image('carI','assets/img/carI.png');
		
}
function create(){
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//add the sprite (road image )  to the scene
	roadAsset=game.add.sprite((canvas.width/2)-40,canvas.height-80,'road');
	roadAsset1=game.add.sprite((canvas.width/2)-40,canvas.height-159,'road');
	roadAsset2=game.add.sprite((canvas.width/2)-40,canvas.height-238,'road');
	roadAsset3=game.add.sprite((canvas.width/2)-40,canvas.height-316,'road');
	roadAsset4=game.add.sprite((canvas.width/2)-40,canvas.height-394,'road');
	roadAsset5=game.add.sprite((canvas.width/2)-40,canvas.height-472,'road');
	
	
	moto=game.add.sprite((canvas.width/2)-30,canvas.height-60,'moto');
	moto.inputEnabled=true;
	moto.input.enableDrag(false,true,true,150);
	moto.input.enableSnap(40, 40, false, true);
    cursors = game.input.keyboard.createCursorKeys();
	//moto.input.boundsRect=roadAsset;
	
	car=game.add.sprite((canvas.width/2)-35,canvas.height-159,'car');
	carI=game.add.sprite((canvas.width/2)+10,canvas.height-316,'carI');
	game.physics.enable(carI,Phaser.Physics.ARCADE);
	carI.body.velocity.set(0,60);
	carI.body.collideWorldBounds =true;
	carI.body.bounce.set(1);
	
	temp=canvas.height-472;
}
function update(){
	if(roadAsset.y<canvas.height+20)
	roadAsset.y+=1;
    else{
	 roadAsset.y=temp-79;
	 temp-=79;
	}
	if(roadAsset1.y<canvas.height+20)
	roadAsset1.y+=1;
    else{
	 roadAsset1.y=temp-79;
	 temp-=79;
	}
	if(roadAsset2.y<canvas.height+20)
	roadAsset2.y+=1;
    else{
	 roadAsset2.y=temp-79;
	 temp-=79;
	}
	if(roadAsset3.y<canvas.height+20)
	roadAsset3.y+=1;
    else{
	 roadAsset3.y=temp-79;
	 temp-=79;
	}
	if(roadAsset4.y<canvas.height+20)
	roadAsset4.y+=1;
    else{
	 roadAsset4.y=temp-79;
	 temp-=79;
	}	
	if(roadAsset5.y<canvas.height+20)
	roadAsset5.y+=1;
    else{
	 roadAsset5.y=temp-79;
	 temp-=79;
	}
	if(car.y<canvas.height+20)
	 car.y+=0.5;
    else{
	 car.y=-50;	
	}	
   if (cursors.left.isDown)
    {
        moto.x -= 2;
    }
    else if (cursors.right.isDown)
    {
        moto.x += 2;
    }
	temp=+1;
	
}*/