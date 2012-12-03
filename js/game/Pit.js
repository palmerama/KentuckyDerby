(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;



    if (namespace.Pit === undefined) 
	{
        namespace.Pit = function(aStage)
 		{	
			stage = aStage;
        }

        var p = namespace.Pit.prototype;
		
		
		p.init = function(horse)
		{
			this.horse = horse;

			this.ballMask = new createjs.Bitmap('img/pit3mask.png');
			this.ballMask.x = 377;
			this.ballMask.y = 346;
			stage.addChild(this.ballMask);

			this.ball = new createjs.Bitmap('img/ball.png');
			this.ball.regX = 22;
			this.ball.regY = 37;
			this.ball.x = 400;
			this.ball.y = 200;
			stage.addChild(this.ball);
		}

		p.startBall = function()
		{
			stage.addChild(this.ball);
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
			TweenLite.to(evt.target, .45, {y:355, scaleX:.75, scaleY:.75, ease:Sine.easeIn, onComplete:this.potBall.bind(this)});
		}

		p.potBall = function()
		{
			stage.setChildIndex(this.ballMask, stage.getChildIndex(this.ball));			
			TweenLite.to(this.ball, .3, {y:400, onComplete:this.startBall.bind(this)});
			this.horse.moveForward();
		}
	}

})();
