(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var stageTools;
    var pitsContainer;
    var horsesManager;
    var difficulty;
    var lanesBase;

	var preload;


    if (namespace.PitsManager === undefined) 
	{
        namespace.PitsManager = function(aStage, aStageTools, aHorsesManager)
 		{	
			stage = aStage;
			stageTools = aStageTools;
			horsesManager = aHorsesManager;
			difficulty = 'hard';
        }

        var p = namespace.PitsManager.prototype;
		
		
		p.init = function(aPreload)
		{
			preload = aPreload;

			pitsContainer = new createjs.Container();
			pitsContainer.name = 'pitsContainer';
			stage.addChild(pitsContainer);

			lanesBase = new createjs.Bitmap(preload.getAsset('lanesBase'));
			lanesBase.name = 'lanesBase';
			lanesBase.y = 480 - lanesBase.image.height;
			pitsContainer.addChild(lanesBase);

			var lanesMid = new createjs.Bitmap(preload.getAsset('lanesMid'));
			lanesMid.name = 'lanesMid';
			lanesMid.y = lanesBase.y - lanesMid.image.height;
			pitsContainer.addChildAt(lanesMid, 0);

			var lanesTop = new createjs.Bitmap(preload.getAsset('lanesTop'));
			lanesTop.name = 'lanesTop';
			lanesTop.y = lanesMid.y - lanesTop.image.height;
			pitsContainer.addChildAt(lanesTop, 0);

			var holes = new createjs.Bitmap(preload.getAsset('holes'));
			holes.name = 'holes';
			holes.x = 91;
			holes.y = 329;
			pitsContainer.addChildAt(holes, 1);
			
			this.initPits();
			this.startDoorsSequence();
		}

		p.initPits = function()
		{
			this.pits = [];

			this.createPit(1, {startX:-80, endX:140}, {x:120, skew:42}, true);
			this.createPit(2, {startX:130, endX:263}, {x:255, skew:32}, true);
			this.createPit(3, {startX:400, endX:400}, {x:400, skew:0}, false);
			this.createPit(4, {startX:693, endX:530}, {x:542, skew:-32}, true);
			this.createPit(5, {startX:880, endX:665}, {x:683, skew:-42}, true);

			stageTools.logDisplayList(pitsContainer);
		}

		p.createPit = function(id, ballXPos, doorProps, auto)
		{
			var pit = new namespace.Pit(pitsContainer, stageTools, horsesManager, lanesBase, preload);
			pit.init(id, ballXPos, doorProps, auto);
			this.pits.push(pit);
		}

		p.startDoorsSequence = function()
		{
			for (var i=0; i<this.pits.length; ++i) 
			{
				this.pits[i].startBall();
			}

			this.doorsSequence = [1, 2, 1, .5, 2, 1];
			this.doorsPointer = -1;
			this.doNextStep();
		}

		p.doNextStep = function()
		{
			if (++this.doorsPointer >= this.doorsSequence.length) this.doorsPointer = 0;

			for (var i=0; i<this.pits.length; ++i) 
			{
				this.pits[i].doorsOpen ? this.pits[i].closeDoors() : this.pits[i].openDoors();
			}

			var delayMultiplier; 

			switch (difficulty) 
			{
				case 'easy':
					delayMultiplier = 1;
					break;

				case 'medium':
					delayMultiplier = .5;
					break;

				case 'hard':
					delayMultiplier = .25;
					break;
			}

			var delay = this.doorsSequence[this.doorsPointer] * delayMultiplier;
			TweenLite.delayedCall(delay, this.doNextStep.bind(this));

			// console.log('doors step: ' + this.doorsPointer + ', delay: ' + delay + ' secs');
		}
}

})();
