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
		}

		p.initPits = function()
		{
			this.pits = [];

			this.createPit(1, {startX:-80, endX:140}, {x:120, skew:42}, true);
			this.createPit(2, {startX:130, endX:263}, {x:255, skew:32}, true);
			this.createPit(3, {startX:400, endX:400}, {x:400, skew:0}, false);
			this.createPit(4, {startX:693, endX:530}, {x:542, skew:-32}, true);
			this.createPit(5, {startX:880, endX:665}, {x:683, skew:-42}, true);

			// stageTools.logDisplayList(pitsContainer);
		}

		p.createPit = function(id, ballXPos, doorProps, auto)
		{
			var pit = new namespace.Pit(pitsContainer, stageTools, horsesManager, lanesBase, preload);
			pit.init(id, ballXPos, doorProps, auto);
			this.pits.push(pit);
		}

		p.startDoorsSequence = function(level)
		{
			difficulty = level;
			this.doDoorsSequence = true;

			for (var i=0; i<this.pits.length; ++i) 
			{
				if (difficulty == 'easy') this.pits[i].horseDistance = 78;
				else if (difficulty == 'medium') this.pits[i].horseDistance = 39;
				else this.pits[i].horseDistance = 26;

				this.pits[i].active = true;
				this.pits[i].startBall();
			}

			if (difficulty == 'easy') this.doorsSequence = [2, .5];
			else if (difficulty == 'medium') this.doorsSequence = [2, 1, 1];
			else this.doorsSequence = false;

			this.doorsPointer = -1;
			this.doNextStep();
		}

		p.doNextStep = function()
		{
			if (this.doorsSequence)
			{
				if (++this.doorsPointer >= this.doorsSequence.length) this.doorsPointer = 0;

				for (var i=0; i<this.pits.length; ++i) 
				{
					this.pits[i].doorsOpen ? this.pits[i].closeDoors() : this.pits[i].openDoors();
				}

				var delay = this.doorsSequence[this.doorsPointer];;

				this.doNextStepBound = this.doNextStep.bind(this);
				if (this.doDoorsSequence) TweenLite.delayedCall(delay, this.doNextStepBound);

				// console.log('doors step: ' + this.doorsPointer + ', delay: ' + delay + ' secs');
			}
			else {
				for (var i=0; i<this.pits.length; ++i) 
				{
					this.pits[i].doorsOpen ? this.pits[i].closeDoors() : this.pits[i].openDoors();
				}

				this.doNextStepBound = this.doNextStep.bind(this);
				if (this.doDoorsSequence) TweenLite.delayedCall(.4 + Math.random()*4, this.doNextStepBound);
			}
			
		}

		p.reset = function()
		{
			this.doDoorsSequence = false;
			TweenLite.killDelayedCallsTo(this.doNextStepBound);

			for (var i=0; i<this.pits.length; ++i) 
			{
				this.pits[i].reset();
			}
		}
}

})();
