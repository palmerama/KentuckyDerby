(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');


    if (namespace.HighScoresManager === undefined) 
	{
        namespace.HighScoresManager = function()
 		{	
        }

        var p = namespace.HighScoresManager.prototype;
		var gameManager;

		
		p.init = function(aGameManager)
		{
			gameManager = aGameManager;
			this.rudeWords = ['TIT','BUM','ASS','GAY','COK','DIK','GIT','NOB','JIZ','MUF','PUF','SEX','DIC','RIM','POO','WEE','FKR','FUK','FUC','CNT'];
		}

		p.setRow = function(row, name, time)
		{
			document.getElementById('hs' + row + 'a').innerHTML = row + '.';
			document.getElementById('hs' + row + 'b').innerHTML = name;
			document.getElementById('hs' + row + 'c').innerHTML = time;
		}

		p.initScoreEntry = function(score, time)
		{
			this.userScore = score;
			this.userTime = time;

			$('#submitButton').click((function() {
					this.saveScore();
				}).bind(this));

			this.nameField = document.getElementById('nicknameField');
			this.nameField.focus();
			this.nameField.onchange = this.nameField.onblur = this.onNameChange.bind(this);
		}

		p.onNameChange = function(event)
		{
			this.nameField.value = this.nameField.value.toUpperCase();

			// check rude words, asterisk out
			for (var i=0; i<this.rudeWords.length; ++i)
			{
				if (this.nameField.value == this.rudeWords[i])
				{
					var name = this.nameField.value;
					name = name.substring(0, 1) + '*' + name.substring(2);
					this.nameField.value = name;
					break;
				}
			}
		}

		p.saveScore = function()
		{
			this.onNameChange(null);

			if (this.nameField.value.length > 0)
			{
				var getHighScores = this.getHighScores;

				var request = $.ajax({
				  url: "save_score.php",
				  type: "GET",
				  data: {name:this.nameField.value, score:this.userScore, time:this.userTime},
				  dataType: "html"
				});

				request.done(function(msg) {
				  	console.log(msg);
				  	getHighScores();
				});

				request.fail(function(jqXHR, textStatus) {
					 alert( "Request failed: " + textStatus );
					 getHighScores();
				});
			}			
		}

		p.getHighScores = function()
		{
			var request = $.ajax({
			  url: "get_scores.php",
			  type: "GET",
			  dataType: "html"
			});

			request.done(function(html) {
			  	$('#highscorestable').replaceWith(html);
			  	gameManager.showHighScores();	
			});

			request.fail(function(jqXHR, textStatus) {
				 alert( "Request failed: " + textStatus );
			});
		}
}

})();
