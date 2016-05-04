define(['../module'], function ( module ) {

  module.directive("zappiProductGrid", ["$animate", "$timeout", function( $animate, $timeout ){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	items: "=",
	    	filter: "=?",
	    	itemSelector: "@"
	    },
	    controller: function( $scope, $element ){
	    	$animate.enabled(true);

	    	$scope.getPositionStyle = function( index, columns, rowHeight ){

	    		var colWidth = 100 / columns;
	    		var x = ( index % 3 ) * colWidth;
	    		var y = ( ( index - ( index % 3 ) ) / 3 ) * rowHeight;

	    		return [ "left: ", x, "%; top: ", y, "px" ].join('');
	    	}

	    	$scope.getGridHeightStyle = function( items_length, columns, rowHeight ){
	    		return [ "min-height: ", ( Math.ceil( items_length / columns ) * rowHeight ), "px" ].join('')
	    	}

	    },
	    link: function( $scope, $element ){

	    	var maxWidth = 0;
	    	var maxHeight = 0;

	    	$scope.$watch( 'items', function(v){

	    	});

	    	$timeout( function(){
		    	if( $scope.itemSelector ){
		    		angular.forEach( $element.find( $scope.itemSelector ), function(v,i){
		    			maxWidth = $(v).width() > maxWidth ? $(v).width() : maxWidth;
		    			maxHeight = $(v).height() > maxHeight ? $(v).height() : maxHeight;
		    		});
		    	}
	    	}, 500 );

	    	

	    },
      	templateUrl: '/prototypes/products/partials/zappi_product_grid.html'
	  }
	}]);

});	