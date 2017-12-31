/****************************************************************************************
 ** @Boot State
 ** General game settings are defined, and the assets of the preloading screeb are loaded
 ** like: 
 ** -LOADING BAR
 ** -LOGO
 ** Nothing is shown to the user
 *****************************************************************************************/

var GameOne = GameOne || {};
GameOne.Boot = function () {};
var aspect_ratio;
var scale_ratio;

GameOne.Boot.prototype = {
	preload: function () {

		this.load.image('loader', 'assets/img/loadBar.png');
		this.load.image('paperGame', 'assets/img/papergames.png');
		this.load.image('fusion', 'assets/img/fusion.png');
	},
	create: function () {
		//laoading screen will have  a  background
		this.game.stage.backgroundColor = '#fff';
		console.log("this and game", this, this.game, Object.getPrototypeOf(this));


		//scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//have the game centered horisontally
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;


		this.state.start('Preload');

	}
};