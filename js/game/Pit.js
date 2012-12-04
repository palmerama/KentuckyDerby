(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var horsesManager;


    if (namespace.Pit === undefined) 
	{
        namespace.Pit = function(aStage, aHorsesManager)
 		{	
			stage = aStage;
			horsesManager = aHorsesManager;
        }

        var p = namespace.Pit.prototype;
		
		
		p.init = function(id, holeMaskPos, ballXPos, doorProps, lanes)
		{
			this.id = id;
			this.horse = horsesManager['horse'+id];
			this.holeMaskPos = holeMaskPos;
			this.ballX = ballXPos;
			this.doorProps = doorProps;
			this.lanes = lanes;

			this.createMasks();
			this.createDoors();
			this.createBall();
		}

		p.createBall = function()
		{
			this.ball = new createjs.Bitmap('img/ball.png');
			this.ball.regX = 22;
			this.ball.regY = 37;
			this.ball.x = -1000;
			this.ball.y = -1000;
			stage.addChild(this.ball);
		}

		p.createMasks = function()
		{
			this.holeMask = new createjs.Bitmap('img/pit' + this.id + 'mask.png');
			this.holeMask.x = this.holeMaskPos.x;
			this.holeMask.y = this.holeMaskPos.y;
			stage.addChild(this.holeMask);
		}

		p.createDoors = function()
		{
			this.leftDoor = new createjs.Bitmap('img/pitdoor.png');
			this.leftDoor.skewX = this.doorProps.skew;
			this.leftDoor.x = this.doorProps.x - this.leftDoor.image.width;
			this.leftDoor.y = 347 - this.leftDoor.image.height/2;
			stage.addChildAt(this.leftDoor, stage.getChildIndex(this.lanes));

			this.rightDoor = this.leftDoor.clone();
			this.rightDoor.skewX = this.doorProps.skew;
			this.rightDoor.x = this.doorProps.x;
			this.rightDoor.y = 347 - this.rightDoor.image.height/2;
			stage.addChildAt(this.rightDoor, stage.getChildIndex(this.lanes));

			this.doorsOpen = false;
		}

		p.startBall = function()
		{
			stage.addChild(this.ball);
			this.ball.x = this.ballX.startX;
			this.ball.y = 550;
			this.ball.scaleX = this.ball.scaleY = 1.3;
			TweenLite.to(this.ball, .4, {delay:1, y:472, scaleX:1, scaleY:1, ease:Quad.easeOut, onComplete:this.addPressListenerToBall.bind(this)});
		}

		p.addPressListenerToBall = function()
		{
			this.ball.onPress = this.onPressBall.bind(this);
		}

		p.onPressBall = function(evt)
		{
			evt.target.onPress = null;
			this.ballTween = TweenLite.to(evt.target, .45, {x:this.ballX.endX, y:328, scaleX:.75, scaleY:.75, ease:Sine.easeIn, 
				onUpdate:this.onBallUpdate.bind(this), onComplete:this.potBall.bind(this)});
		}

		p.onBallUpdate = function()
		{
			if (this.ball.y <= 355 && this.doorsOpen) 
			{
				this.ballTween.kill();
				this.potBall();
			}
		}

		p.potBall = function()
		{
			stage.setChildIndex(this.holeMask, stage.getChildIndex(this.ball));			
			TweenLite.to(this.ball, .3, {y:400, onComplete:this.startBall.bind(this)});
			if (this.doorsOpen) this.horse.moveForward();
		}

		p.openDoors = function()
		{
			this.doorsOpen = true;
			TweenLite.to(this.leftDoor, .5, {x:this.doorProps.x - this.leftDoor.image.width*2, ease:Bounce.easeOut});
			TweenLite.to(this.rightDoor, .5, {x:this.doorProps.x + this.rightDoor.image.width, ease:Bounce.easeOut});
		}

		p.closeDoors = function()
		{
			this.doorsOpen = false;
			TweenLite.to(this.leftDoor, .5, {x:this.doorProps.x - this.leftDoor.image.width, ease:Bounce.easeOut});
			TweenLite.to(this.rightDoor, .5, {x:this.doorProps.x, ease:Bounce.easeOut});
		}
	}

})();
