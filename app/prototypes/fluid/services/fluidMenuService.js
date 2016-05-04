define(['../module'], function ( module ) {

  module.factory('FLUIDMenuService',["$http", function($http) {

	var fluidMenu = {
	    getMenu: function() {
	    	var promise = promise || null;
	      	if ( !promise ) {
	        	promise = $http.get('/prototypes/fluid/fixtures/menu.json').then(function (response) {
	          	return response.data;
	        });
	      }
	      return promise;
	    }
	  };

	  return fluidMenu

  }]);

});