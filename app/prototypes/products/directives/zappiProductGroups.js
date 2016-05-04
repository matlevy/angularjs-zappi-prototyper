define(['../module'], function ( module ) {

  module.directive("zappiProductGroups", ["$timeout", "$interval", function($interval){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	items: "=",
	    	selected: "=",
	    	onGroupSelected: "=?"
	    },
	    controller: function( $scope, $element ){
	    	
	    	$scope.selectGroup = function( group ){
	    		$scope.selected = group;

	    		if( $scope.onGroupSelected )
	    			$scope.onGroupSelected( group );
	    	}

	    	$scope.showAllProducts = function(){
	    		$scope.selected = null;

	    		if( $scope.onGroupSelected )
	    			$scope.onGroupSelected( null );
	    	}

	    },
      	templateUrl: '/prototypes/products/partials/zappi_product_groups.html'
	  }
	}]);

});	