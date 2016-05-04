define(['../module'], function ( module ) {

  module.factory('ProtoTypePathsService',["$http", function($http) {

	var pathsService = {
	    getPaths: function(path) {
	    	var promise = promise || null;
	      	if ( !promise ) {
	        	promise = $http.get('/prototypes/datacollector/paths/' + path + '.json').then(function (response) {
	          	return response.data;
	        });
	      }
	      return promise;
	    }
	  };

	  return pathsService

  }]);

});