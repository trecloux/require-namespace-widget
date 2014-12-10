require.config({
});	
require(['widget-dependency'], function(dependency) {
	console.log('Widget loaded, dependency : ' + dependency.message() );
});