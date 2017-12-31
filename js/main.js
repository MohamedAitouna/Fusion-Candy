var GameOne = GameOne || {};
console.log("window.innerHTML", window.innerHeight);
GameOne.game = new Phaser.Game(780, 838, Phaser.AUTO, '');

GameOne.game.state.add('Boot', GameOne.Boot);
GameOne.game.state.add('Preload', GameOne.Preload);
GameOne.game.state.add('MainMenu', GameOne.MainMenu);
GameOne.game.state.add('Levels', GameOne.Levels);
GameOne.game.state.add('pokemon', GameOne.GamePokemon);
GameOne.game.state.add('digimon', GameOne.GameDigimon);

GameOne.game.state.start('Boot');

GameOne.mainObjects={
    lvl:0,
    currentLvl:0,
    score:[100,150,150,120,80,50],
    moves:[10,11,12,13,12,10]
};
