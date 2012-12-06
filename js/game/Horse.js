(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stageTools;
    var container;
    var horse;
    var moveDuration;
    var moveDistance;

    var preload;


    if (namespace.Horse === undefined) 
	{
        namespace.Horse = function(aContainer, aPreload, aStageTools)
 		{	
 			stageTools = aStageTools;
			container = aContainer;
			preload = aPreload;
			moveDuration = 2;
			moveDistance = 40;
        }

        var p = namespace.Horse.prototype;
		
		
		p.init = function(id)
		{
			this.horse = new createjs.Bitmap(preload.getAsset('horse'+id));
			this.horse.name = 'horse'+id;
			this.horse.regX = 50;
			this.horse.regY = 82;
			this.horse.x = 60;
			this.horse.y = 122+(41*(id-1));

			container.addChild(this.horse);

			var grass = new createjs.Bitmap(preload.getAsset('grass'+id));
			grass.name = 'grass'+id;
			grass.y = this.horse.y - 21;
			container.addChild(grass);
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
