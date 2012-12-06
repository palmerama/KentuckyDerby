(function(){

    var namespace = GAMEMAIN.namespace('GAMEMAIN.game');


    if (namespace.StageTools === undefined) 
	{
        namespace.StageTools = function()
 		{	
        }

        var p = namespace.StageTools.prototype;
		
		
		p.logDisplayList = function(container)
		{
			console.log('\n\n:: display list for container:', container.name);

			for (var i=container.getNumChildren()-1; i>=0; --i)
			{
				console.log('\t', i, ':', container.getChildAt(i).name);
			}

			console.log('\n');
		}

		p.getChildIndexByName = function(container, child)
		{
			return container.getChildIndex(container[child]);
		}
}

})();
