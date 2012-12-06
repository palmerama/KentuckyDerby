GAMEMAIN.init = function()
{
	console.log("game init");

	var gameStage = new createjs.Stage(document.getElementById('gameStageCanvas'));
	gameStage.name = 'mainStage';

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
    	bg.name = 'bg';
    	gameStage.addChild(bg);

    	var stageTools = new game.StageTools();

    	var horsesManager = new game.HorsesManager(gameStage, stageTools);
		horsesManager.init(preload);

		var post = new createjs.Bitmap(preload.getAsset('post'));
    	post.name = 'post';
    	post.x = 715;
    	post.y = 70;
    	gameStage.addChild(post);

		var pitsManager = new game.PitsManager(gameStage, stageTools, horsesManager);
		pitsManager.init(preload);
    }

};

window.addEventListener('load', GAMEMAIN.init, false);