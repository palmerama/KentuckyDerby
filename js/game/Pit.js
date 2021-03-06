(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stageTools;
    var container;
    var horsesManager;
	var lanesBase;

    var preload;


    if (namespace.Pit === undefined) 
	{
        namespace.Pit = function(aContainer, aStageTools, aHorsesManager, aLanesBase, aPreload)
 		{	
			container = aContainer;
			stageTools = aStageTools;
			preload = aPreload;
			horsesManager = aHorsesManager;
			lanesBase = aLanesBase;
        }

        var p = namespace.Pit.prototype;
		
		
		p.init = function(id, ballXPos, doorProps, auto)
		{
			this.id = id;
			this.horse = horsesManager['horse'+id];
			this.ballX = ballXPos;
			this.doorProps = doorProps;
			this.auto = auto;
			this.active = false;
			this.rolling = false;

			this.createBall();
			this.createDoors();		
		}

		p.createBall = function()
		{
			var json = {
				'frames': [[115, 2, 51, 52, 0, 0, 0], [2, 59, 51, 51, 0, 0, 0], [170, 2, 53, 52, 0, 0, 0], [2, 2, 52, 53, 0, 0, 0], [58, 2, 53, 52, 0, 0, 0]], 
				'animations': {'all': {'frames': [0, 1, 2, 3, 4, 1, 3, 4, 0, 2]}}, 
				'images': [preload.getAsset('snowball1')]
			}

			var spriteSheet = new createjs.SpriteSheet(json);
 			this.ball = new createjs.BitmapAnimation(spriteSheet);
 			this.ball.name = 'ball'+this.id;
 			this.ball.gotoAndStop(1);

			this.ball.regX = 22;
			this.ball.regY = 37;
			this.ball.x = -1000;
			this.ball.y = -1000;
			container.addChild(this.ball);
		}

		p.createDoors = function()
		{
			this.leftDoor = new createjs.Bitmap(preload.getAsset('pitDoor'));
			this.leftDoor.name = 'leftDoor'+this.id;
			this.leftDoor.skewX = this.doorProps.skew;
			this.leftDoor.x = this.doorProps.x - this.leftDoor.image.width;
			this.leftDoor.y = 340 - this.leftDoor.image.height/2;
			container.addChildAt(this.leftDoor, 2);

			this.rightDoor = this.leftDoor.clone();
			this.rightDoor.name = 'rightDoor'+this.id;
			this.rightDoor.skewX = this.doorProps.skew;
			this.rightDoor.x = this.doorProps.x;
			this.rightDoor.y = 340 - this.rightDoor.image.height/2;
			container.addChildAt(this.rightDoor, 2);

			this.doorsOpen = false;
		}

		p.startBall = function()
		{
			if (this.active)
			{
				container.addChild(this.ball);
				this.ball.gotoAndPlay(Math.floor(1+Math.random()*this.ball.getNumFrames-1));
				this.ball.x = this.ballX.startX;
				this.ball.y = 550;
				this.ball.buttonMode = true;
				this.ball.scaleX = this.ball.scaleY = 1.3;

				var props = {y:472, scaleX:1, scaleY:1, ease:Quad.easeOut};
				this.auto ? props.onComplete = this.autoHesitate.bind(this) : props.onComplete = this.addPressListenerToBall.bind(this);
				TweenLite.to(this.ball, .4, props);
			}			
		}

		p.addPressListenerToBall = function()
		{
			this.rolling = false;
			this.ball.stop();
			this.ball.onPress = this.onPressBall.bind(this);

			this.keyChecker = this.checkForSpace.bind(this);
			createjs.Ticker.addListener(this.keyChecker);
		}

		p.checkForSpace = function()
		{
			if (keydown.space && this.rolling == false) 
			{
				this.ball.onPress = null;
				this.fireBall();
			}
		}

		p.onPressBall = function(evt)
		{
			evt.target.onPress = null;
			this.fireBall();
		}

		p.autoHesitate = function()
		{
			this.ball.stop();
			this.rolling = false;

			if (this.doorsOpen)
			{
				var delay = .1 + Math.random()*2;
				TweenLite.delayedCall(delay, this.fireBall.bind(this));
			}
			else TweenLite.delayedCall(.4, this.autoHesitate.bind(this));
		}

		p.fireBall = function()
		{
			createjs.Ticker.removeListener(this.keyChecker);
			this.rolling = true;

			var duration = 1;
			if (this.auto) duration = .9 + Math.random()*.45;

			var props = {x:this.ballX.endX, y:327, scaleX:.45, scaleY:.45, ease:Sine.easeOut, 
				onUpdate:this.onBallUpdate.bind(this), onComplete:this.loseBall.bind(this)};

			// switch to frames at low fps and force framerate for tween (don't miss hole!)
			if (createjs.Ticker.getMeasuredFPS() < 30) 
			{
				props.useFrames = true;
				duration = 30;
			} 
			
			this.ballTween = TweenMax.to(this.ball, duration, props);
			this.ball.play();
		}

		p.onBallUpdate = function()
		{
			// if (this.ball.y <= 347 && this.ball.y > 335 && this.doorsOpen) 

			if (this.ballTween.progress() <= .75 && this.ballTween.progress() > .7 && this.doorsOpen) 
			{
				if (!this.auto) console.log(createjs.Ticker.getMeasuredFPS() + 'fps, potted at:', this.ballTween.progress());

				this.ballTween.kill();
				this.potBall();
			}
		}

		p.loseBall = function()
		{
			container.addChildAt(this.ball, 1);
			TweenLite.to(this.ball, .23, {y:400, onComplete:this.startBall.bind(this), ease:Expo.easeIn});			
		}

		p.potBall = function()
		{
			this.ball.stop();

			container.removeChild(this.ball);
			container.addChildAt(this.ball, container.getChildIndex(lanesBase));

			TweenLite.to(this.ball, .3, {y:400, onComplete:this.startBall.bind(this), ease:Expo.easeIn});
			this.horse.moveForward(this.horseDistance);
		}

		p.setHorseDistance = function(you, auto)
		{
			this.auto ? this.horseDistance = auto : this.horseDistance = you;
		}

		p.openDoors = function()
		{
			this.doorsOpen = true;
			TweenLite.to(this.leftDoor, .4, {x:this.doorProps.x - this.leftDoor.image.width*2, ease:Bounce.easeOut});
			TweenLite.to(this.rightDoor, .4, {x:this.doorProps.x + this.rightDoor.image.width, ease:Bounce.easeOut});
		}

		p.closeDoors = function()
		{
			this.doorsOpen = false;
			TweenLite.to(this.leftDoor, .4, {x:this.doorProps.x - this.leftDoor.image.width, ease:Bounce.easeOut});
			TweenLite.to(this.rightDoor, .4, {x:this.doorProps.x, ease:Bounce.easeOut});
		}

		p.reset = function()
		{
			this.active = false;
			TweenLite.killTweensOf(this.horse);
			TweenLite.killTweensOf(this.ball);

			this.ball.y = 550;
			this.closeDoors();
		}
	}

})();
