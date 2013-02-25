(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var manifest;
    var preload;
    var stage;


    if (namespace.Preload === undefined) 
	{
        namespace.Preload = function(aStage)
 		{	
			stage = aStage;
        }

        var p = namespace.Preload.prototype;
		
		
		p.init = function(onLoadComplete)
		{
			this.onLoadComplete = onLoadComplete;
			this.showPreloader();

			manifest = [

				{src:'img/bg.jpg', id:'bg'},
				{src:'img/post.png', id:'post'},

				{src:'img/horse1.png', id:'horse1'},
				{src:'img/horse2.png', id:'horse2'},
				{src:'img/horse3.png', id:'horse3'},
				{src:'img/horse4.png', id:'horse4'},
				{src:'img/horse5.png', id:'horse5'},

				{src:'img/grass1.png', id:'grass1'},
				{src:'img/grass2.png', id:'grass2'},
				{src:'img/grass3.png', id:'grass3'},
				{src:'img/grass4.png', id:'grass4'},
				{src:'img/grass5.png', id:'grass5'},

				{src:'img/lanesbase.png', id:'lanesBase'},
				{src:'img/lanesmid.png', id:'lanesMid'},
				{src:'img/lanestop.png', id:'lanesTop'},
				{src:'img/holes.jpg', id:'holes'},

				{src:'img/ball.png', id:'ball'},
				{src:'img/snowball1.png', id:'snowball1'},
				{src:'img/pitdoor.png', id:'pitDoor'},

				{src:'sound/airhorn.mp3|sound/airhorn.ogg', id:'airhorn'},
				{src:'sound/music.mp3|sound/music.ogg', id:'music'}
			];

			preload = new createjs.PreloadJS();
			preload.installPlugin(createjs.SoundJS);
		    preload.onComplete = this.loadComplete.bind(this);
		    preload.onProgress = this.onProgress.bind(this);
		    preload.loadManifest(manifest);
		}

		p.showPreloader = function()
		{
			this.container = new createjs.Container();
			this.container.x = 400;
			this.container.y = 240;
			stage.addChild(this.container);

			var loading = new createjs.Bitmap('img/ui/loading.jpg');
			loading.x = -99;
			loading.y = -45;
			loading.alpha = 0;
			TweenLite.to(loading, .8, {alpha:1, ease:Sine.easeIn});
			this.container.addChild(loading);

			var bgBar = new createjs.Shape();
			var g = bgBar.graphics;
			g.beginFill('#491111');
			g.rect(-217, 10, 434, 12);
			g.endFill();
			this.container.addChild(bgBar);

			var brownBar = new createjs.Bitmap('img/ui/loadingbar.jpg');
			brownBar.x = -217;
			brownBar.y = 10;
			this.container.addChild(brownBar);

			this.bar = new createjs.Shape();
			g = this.bar.graphics;
			g.beginFill('#FFFF00');
			g.rect(-217, 10, 2, 12);
			g.endFill();

			brownBar.mask = this.bar;
			this.barWidth = 2;
		}

		p.onProgress = function(event)
		{
			TweenLite.to(this, .3, {barWidth:2 + (432*event.loaded), ease:Sine.easeOut, onUpdate:this.setBarWidth.bind(this)});
		}

		p.setBarWidth = function()
		{
			var g = this.bar.graphics;
			g.beginFill('#FFFF00');
			g.rect(-217, 10, this.barWidth, 12);
			g.endFill();
		}

		p.loadComplete = function()
		{
			stage.removeChild(this.container);
			this.onLoadComplete();
		}

		p.getAsset = function(asset)
		{
			return preload.getResult(asset).result;
		}
}

})();
