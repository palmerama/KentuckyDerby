(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var pitsContainer;
    var horsesManager;
    var difficulty;

	var preload;


    if (namespace.PitsManager === undefined) 
	{
        namespace.PitsManager = function(aStage, aHorsesManager)
 		{	
			stage = aStage;
			horsesManager = aHorsesManager;
			difficulty = 'easy';
        }

        var p = namespace.PitsManager.prototype;
		
		
		p.init = function(aPreload)
		{
			preload = aPreload;

			pitsContainer = new createjs.Container();
			stage.addChild(pitsContainer);

			var lanesBase = new createjs.Bitmap(preload.getAsset('lanesBase'));
			lanesBase.y = 480 - lanesBase.image.height;
			pitsContainer.addChild(lanesBase);

			var lanesMid = new createjs.Bitmap(preload.getAsset('lanesMid'));
			lanesMid.y = lanesBase.y - lanesMid.image.height;
			pitsContainer.addChildAt(lanesMid, 0);

			var lanesTop = new createjs.Bitmap(preload.getAsset('lanesTop'));
			lanesTop.y = lanesMid.y - lanesTop.image.height;
			pitsContainer.addChildAt(lanesTop, 0);

			var holes = new createjs.Bitmap(preload.getAsset('holes'));
			holes.x = lanesTop.x + 98;
			holes.y = lanesTop.y + 67;
			pitsContainer.addChildAt(holes, 1);
			
			this.initPits();
			this.startDoorsSequence();
		}

		p.initPits = function()
		{
			this.pits = [];

			this.createPit(1, {startX:-100, endX:154}, {x:132, skew:42}, true);
			this.createPit(2, {startX:130, endX:263}, {x:255, skew:32}, true);
			this.createPit(3, {startX:400, endX:400}, {x:400, skew:0}, false);
			this.createPit(4, {startX:693, endX:530}, {x:542, skew:-32}, true);
			this.createPit(5, {startX:900, endX:653}, {x:672, skew:-42}, true);
		}

		p.createPit = function(id, ballXPos, doorProps, auto)
		{
			var pit = new namespace.Pit(pitsContainer, horsesManager, preload);
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
					delayMultiplier = 1.5;
					break;

				case 'medium':
					delayMultiplier = 1;
					break;

				case 'hard':
					delayMultiplier = .5;
					break;
			}

			var delay = this.doorsSequence[this.doorsPointer] * delayMultiplier;
			TweenLite.delayedCall(delay, this.doNextStep.bind(this));

			console.log('doors step: ' + this.doorsPointer + ', delay: ' + delay + ' secs');
		}
}

})();
