(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var preload;
    var container;


    if (namespace.HorsesManager === undefined) 
	{
        namespace.HorsesManager = function(aStage)
 		{	
			stage = aStage;
        }

        var p = namespace.HorsesManager.prototype;
		
		
		p.init = function(aPreload)
		{
			preload = aPreload;

			container = new createjs.Container();
			stage.addChild(container);

			this.createHorse(1);
			this.createHorse(2);
			this.createHorse(3);
			this.createHorse(4);
			this.createHorse(5);
		}

		p.createHorse = function(id)
		{
			this['horse'+id] = new namespace.Horse(container, preload);
			this['horse'+id].init(id);
		}
}

})();
