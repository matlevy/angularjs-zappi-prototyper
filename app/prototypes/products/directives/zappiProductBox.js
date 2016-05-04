define(['../module'], function ( module ) {

  module.directive("zappiProductBox", ["$animate", function( $animate ){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	product: "=",
	    },
	    controller: function( $scope, $element ){
	    	$animate.enabled(true);
	    },
	    templateUrl: '/prototypes/products/partials/zappi_product_box.html'
	  }
	}]);

});	