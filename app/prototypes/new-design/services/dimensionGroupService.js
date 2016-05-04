define(['../module'], function ( module ) {

  module.factory('DimensionGroupService',["$http", function($http) {

	var dimensionGroupService = {
	    async: function(target_group,country,product) {
	    	var promise = promise || null;
	      	if ( !promise ) {
	      		console.log( 'https://www.zappistore.com/target_groups/' + country + '/' + target_group + '/dimension_groups.json?product_id=' + product );
	        	promise = $http.get( 'https://www.zappistore.com/target_groups/' + country + '/' + target_group + '/dimension_groups.json?product_id=' + product ).then(function (response) {
	          	return response.data;
	        });
	      }
	      return promise;
	    }
	  };

	  return dimensionGroupService

  }]);

});