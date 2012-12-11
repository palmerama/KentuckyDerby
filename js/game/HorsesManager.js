(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var stageTools;
    var preload;
    var container;
    var horseList;


    if (namespace.HorsesManager === undefined) 
	{
        namespace.HorsesManager = function(aStage, aStageTools)
 		{	
			stage = aStage;
			stageTools = aStageTools;
        }

        var p = namespace.HorsesManager.prototype;
		
		
		p.init = function(aPreload)
		{
			preload = aPreload;

			container = new createjs.Container();
			container.name = 'horsesContainer';
			stage.addChild(container);

			horseList = [];

			this.createHorse(1);
			this.createHorse(2);
			this.createHorse(3);
			this.createHorse(4);
			this.createHorse(5);

			// stageTools.logDisplayList(container);
		}

		p.getReady = function()
		{
			for (var i=0; i<horseList.length; ++i)
			{
			 	horseList[i].onYourMarks();
			}
		}

		p.createHorse = function(id)
		{
			this['horse'+id] = new namespace.Horse(container, preload, stageTools);
			this['horse'+id].init(id);
			horseList.push(this['horse'+id]);
		}

		p.checkForWinner = function()
		{
			var winner = false;

			for (var i=0; i<horseList.length; ++i) 
			{
				if (horseList[i].horse.x > 700) 
				{
					winner = horseList[i].id;
					break;
				}
			}

			return winner;
		}

		p.reset = function()
		{
			for (var i=0; i<horseList.length; ++i)
			{
			 	TweenLite.to(horseList[i], 0, {x:-60, rotation:0, scaleX:1, scaleY:1});
			}
		}
}

})();
