define(['../module'], function ( module ) {

  module.factory('ProtoTypeIndexService',["$http", function($http) {

	var protoTypeIndexService = {
	    async: function() {
	    	var promise = promise || null;
	      	if ( !promise ) {
	        	promise = $http.get('/prototypes/index.json').then(function (response) {
	          	return response.data;
	        });
	      }
	      return promise;
	    }
	  };

	  return protoTypeIndexService

  }]);

});