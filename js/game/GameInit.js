GAMEMAIN.init = function()
{
	console.log("game init");

	gameStage = new createjs.Stage(document.getElementById('gameStageCanvas'));

	createjs.Ticker.setFPS(60);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.addListener(gameStage);

	//DEPENDENCIES: use private vars
	var game = GAMEMAIN.namespace('GAMEMAIN.game');

	var horsesManager = new game.HorsesManager(gameStage);
	horsesManager.init();

	var pitsManager = new game.PitsManager(gameStage, horsesManager);
	pitsManager.init();

};

window.addEventListener('load', GAMEMAIN.init, false);