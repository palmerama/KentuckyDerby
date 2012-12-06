(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var manifest;
    var preload;


    if (namespace.Preload === undefined) 
	{
        namespace.Preload = function()
 		{	
			
        }

        var p = namespace.Preload.prototype;
		
		
		p.init = function(onLoadComplete)
		{
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
				{src:'img/pitdoor.png', id:'pitDoor'}

			];

			preload = new createjs.PreloadJS();
		    preload.onComplete = onLoadComplete;
		    preload.loadManifest(manifest);
		}

		p.getAsset = function(asset)
		{
			return preload.getResult(asset).result;
		}
}

})();
