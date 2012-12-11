(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');

    var stage;


    if (namespace.GameManager === undefined) 
	{
        namespace.GameManager = function(aStage)
 		{	
 			stage = aStage;
        }

        var p = namespace.GameManager.prototype;
		
		var preload;
		var pitsManager;
		var horsesManager;
		var highscoresManager;

		
		p.init = function()
		{
			preload = new namespace.Preload(stage);
			preload.init(this.onPreloadComplete.bind(this));
		}

		p.onPreloadComplete = function(event) 
	    {
	    	this.showIntro();
	    	this.initGame();

			TweenLite.to(ui, .7, {css:{backgroundColor:'rgba(0, 0, 0, .8)'}, ease:Sine.easeIn});

			$('#easyButton').click((function() {
				this.hideIntro('easy');
			}).bind(this));

			$('#mediumButton').click((function() {
				this.hideIntro('medium');
			}).bind(this));

			$('#hardButton').click((function() {
				this.hideIntro('hard');
			}).bind(this));

			$('#raceAgainWinnerButton').click((function() {
				this.restartGame();
			}).bind(this));

			$('#raceAgainLoserButton').click((function() {
				this.restartGame();
			}).bind(this));

			$('#raceAgainHighScoresButton').click((function() {
				this.restartGame();
			}).bind(this));
	    }

	    p.restartGame = function()
	    {
	    	// pitsManager.reset();
	    	horsesManager.reset();	    	
	    	this.showIntro();
	    }

		p.initGame = function ()
	    {
	    	var bg = new createjs.Bitmap(preload.getAsset('bg'));
	    	bg.name = 'bg';
	    	stage.addChild(bg);

	    	var stageTools = new namespace.StageTools();

	    	horsesManager = new namespace.HorsesManager(stage, stageTools);
			horsesManager.init(preload);

			var post = new createjs.Bitmap(preload.getAsset('post'));
	    	post.name = 'post';
	    	post.x = 715;
	    	post.y = 70;
	    	stage.addChild(post);

			pitsManager = new namespace.PitsManager(stage, stageTools, horsesManager);
			pitsManager.init(preload);

			highscoresManager = new namespace.HighScoresManager();
			highscoresManager.init(this);
	    }

	    p.hideIntro = function(level)
	    {
	    	horsesManager.getReady();

	    	TweenLite.to(intro, .35, {css:{top:'480px'}, ease:Sine.easeIn});
	    	TweenLite.to(ui, .16, {delay:.35, css:{display:'none', alpha:'0'}, ease:Sine.easeIn, onComplete:(function(level)
	    		{
	    			TweenLite.delayedCall(1.5, (function(level)
	    				{
	    					this.startTime = new Date();
	    					pitsManager.startDoorsSequence(level);
	    					this.tickListener = this.checkForWinner.bind(this);
	    					createjs.Ticker.addListener(this.tickListener);
	    				}
	    				).bind(this), [level]);
	    			TweenLite.to(intro, 0, {css:{display:'none'}});
	    		}
	    		).bind(this), onCompleteParams:[level]});
	    }

	    p.checkForWinner = function()
	    {
	    	var winner = horsesManager.checkForWinner();

	    	if (winner) 
    		{
    			createjs.Ticker.removeListener(this.tickListener);
				pitsManager.reset();
				winner == 3 ? this.showWon() : this.showLost();
    		}
	    }

	    p.showIntro = function()
	    {
	    	TweenLite.to(ui, 0, {css:{display:'table-cell', alpha:1}});
	    	TweenLite.to(winner, 0, {css:{display:'none', top:'480px'}});
	    	TweenLite.to(loser, 0, {css:{display:'none', top:'480px'}});
	    	TweenLite.to(highscores, 0, {css:{display:'none', top:'480px'}});

	    	TweenLite.to(intro, .35, {css:{top:'0px', display:'block'}, ease:Sine.easeOut});
	    }

	    p.showWon = function()
	    {
	    	var yourHorseTime = document.getElementById('yourHorseTime');
	    	this.yourTime = this.getPlayTime();
	    	yourHorseTime.innerHTML = this.yourTime;

			TweenLite.to(ui, 0, {css:{display:'table-cell', alpha:1}});
	    	TweenLite.to(loser, 0, {css:{display:'none', top:'480px'}});
	    	TweenLite.to(highscores, 0, {css:{display:'none', top:'480px'}});
	    	TweenLite.to(intro, 0, {css:{display:'none', top:'480px'}});

	    	TweenLite.to(winner, .35, {css:{top:'0px', display:'block'}, ease:Sine.easeOut, onComplete:(function()
	    			{
	    				highscoresManager.initScoreEntry(this.playTimeMS, this.yourTime);
	    			}
	    		).bind(this)});
	    }

	    p.showLost = function()
	    {
	    	TweenLite.to(ui, 0, {css:{display:'table-cell', alpha:1}});
	    	TweenLite.to(winner, 0, {css:{display:'none', top:'480px'}});
	    	TweenLite.to(highscores, 0, {css:{display:'none', top:'480px'}});
	    	TweenLite.to(intro, 0, {css:{display:'none', top:'480px'}});

	    	TweenLite.to(loser, .35, {css:{top:'0px', display:'block'}, ease:Sine.easeOut});
	    }

	    p.showHighScores = function()
	    {
	    	TweenLite.to(ui, 0, {css:{display:'table-cell', alpha:1}});
	    	TweenLite.to(winner, 0, {css:{display:'none', top:'480px'}});
	    	TweenLite.to(loser, 0, {css:{display:'none', top:'480px'}});
	    	TweenLite.to(intro, 0, {css:{display:'none', top:'480px'}});

	    	TweenLite.to(highscores, .35, {css:{top:'0px', display:'block'}, ease:Sine.easeOut});
	    }

	    p.getPlayTime = function()
	    {
	    	if (this.startTime)
	    	{
	    		this.playTimeMS = new Date().getTime() - this.startTime.getTime();

		    	var date = new Date(this.playTimeMS);
		    	var m = date.getMinutes() + '';
		    	var s = date.getSeconds() + '';

		    	if (m.length < 2) m = '0' + m;
		    	if (s.length < 2) s = '0' + s;

		    	return m + ':' + s + ':' + date.getMilliseconds();
		    }
		    else return '01:02:123';
	    }
}

})();
