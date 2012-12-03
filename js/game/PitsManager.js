(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var horsesManager;



    if (namespace.PitsManager === undefined) 
	{
        namespace.PitsManager = function(aStage, aHorsesManager)
 		{	
			stage = aStage;
			horsesManager = aHorsesManager;
        }

        var p = namespace.PitsManager.prototype;
		
		
		p.init = function()
		{
			var lanes = new createjs.Bitmap('img/lanes.png');
			lanes.y = 265;
			stage.addChild(lanes);

			this.pit3 = new namespace.Pit(gameStage);
			this.pit3.init(horsesManager.horse3);
			this.pit3.startBall();
		}
}

})();
