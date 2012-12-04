(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var horsesManager;
    var difficulty;



    if (namespace.PitsManager === undefined) 
	{
        namespace.PitsManager = function(aStage, aHorsesManager)
 		{	
			stage = aStage;
			horsesManager = aHorsesManager;
			difficulty = 'hard';
        }

        var p = namespace.PitsManager.prototype;
		
		
		p.init = function()
		{
			var lanes = new createjs.Bitmap('img/lanes.png');
			lanes.y = 265;
			stage.addChild(lanes);
			
			this.pits = [];

			var pit3 = new namespace.Pit(gameStage, horsesManager);
			pit3.init(3, {x:377, y:346}, {startX:400, endX:400}, {x:400, skew:0}, lanes);
			this.pits.push(pit3);

			pit3.startBall();
			this.startDoorsSequence();
		}

		p.startDoorsSequence = function()
		{
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
					delayMultiplier = 3;
					break;

				case 'medium':
					delayMultiplier = 2;
					break;

				case 'hard':
					delayMultiplier = 1;
					break;
			}

			var delay = this.doorsSequence[this.doorsPointer] * delayMultiplier;
			TweenLite.delayedCall(delay, this.doNextStep.bind(this));

			console.log('doors step: ' + this.doorsPointer + ', delay: ' + delay + ' secs');
		}
}

})();
