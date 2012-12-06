(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var stageTools;
    var preload;
    var container;


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

			this.createHorse(1);
			this.createHorse(2);
			this.createHorse(3);
			this.createHorse(4);
			this.createHorse(5);

			stageTools.logDisplayList(container);
		}

		p.createHorse = function(id)
		{
			this['horse'+id] = new namespace.Horse(container, preload, stageTools);
			this['horse'+id].init(id);
		}
}

})();
