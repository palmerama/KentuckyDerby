(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;
    var horse;
    var moveDuration;
    var moveDistance;


    if (namespace.Horse === undefined) 
	{
        namespace.Horse = function(aStage)
 		{	
			stage = aStage;
			moveDuration = 2;
			moveDistance = 40;
        }

        var p = namespace.Horse.prototype;
		
		
		p.init = function(id)
		{
			this.horse = new createjs.Bitmap('img/horsetest1.png');
			this.horse.regX = 50;
			this.horse.regY = 82;
			this.horse.x = 60;
			this.horse.y = 122+(41*(id-1));

			stage.addChild(this.horse);
		}

		p.moveForward = function()
		{
			TweenLite.to(this.horse, moveDuration/4, {delay:moveDuration/6, scaleX:1.03, scaleY:1.03, rotation:-3-Math.random()*6, ease:Elastic.easeIn});
			TweenLite.to(this.horse, moveDuration/4, {delay:moveDuration/2, scaleX:1, scaleY:1, rotation:3+Math.random()*4, ease:Elastic.easeOut});
			TweenLite.to(this.horse, moveDuration/6, {delay:moveDuration*.65, rotation:0, ease:Elastic.easeOut});
			TweenLite.to(this.horse, moveDuration, {x:this.horse.x+moveDistance, ease:Elastic.easeInOut});
		}
}

})();
