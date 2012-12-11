GAMEMAIN.init = function()
{
	var gameStage = new createjs.Stage(document.getElementById('gameStageCanvas'));
	gameStage.name = 'gameStage';

	createjs.Ticker.setFPS(60);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.addListener(gameStage);

	var game = GAMEMAIN.namespace('GAMEMAIN.game');

	var gameManager = new game.GameManager(gameStage);
	gameManager.init();
    
};

window.addEventListener('load', GAMEMAIN.init, false);