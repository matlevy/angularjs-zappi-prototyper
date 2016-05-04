define(['../module'], function ( module ) {

  module.factory('TargetGroupService',["$http", function($http) {

	var targetGroupService = {
	    async: function(country,product) {
	    	var promise = promise || null;
	      	if ( !promise ) {
	      		console.log( 'https://www.zappistore.com/target_groups/' + country + '.json?product_id=' + product );
	        	promise = $http.get('https://www.zappistore.com/target_groups/' + country + '.json?product_id=' + product).then(function (response) {
	          	return response.data;
	        });
	      }
	      return promise;
	    }
	  };

	  return targetGroupService

  }]);

});