GAMEMAIN.init = function()
{
	console.log("game init");

	var gameStage = new createjs.Stage(document.getElementById('gameStageCanvas'));

	createjs.Ticker.setFPS(60);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.addListener(gameStage);


	//DEPENDENCIES: use private vars
	var game = GAMEMAIN.namespace('GAMEMAIN.game');

	var preload = new game.Preload();
	preload.init(onPreloadComplete);

	function onPreloadComplete(event) 
    {
    	var bg = new createjs.Bitmap(preload.getAsset('bg'));
    	gameStage.addChild(bg);

    	var horsesManager = new game.HorsesManager(gameStage);
		horsesManager.init(preload);

		var pitsManager = new game.PitsManager(gameStage, horsesManager);
		pitsManager.init(preload);
    }

};

window.addEventListener('load', GAMEMAIN.init, false);