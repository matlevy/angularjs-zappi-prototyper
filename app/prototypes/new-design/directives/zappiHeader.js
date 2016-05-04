define(['../module'], function (directives) {

  directives.directive("zappiHeader", ["$timeout", function( $timeout ){
	  return {
	    restrict: 'A',
	    link: function( $scope, $element ){
	    	
	    	$(window).on('scroll', function(e){

	    		$($element).height( $scope.heightStart - $(window).scrollTop() );
	    		$element.find('.page-title, .product-name').css( 'opacity', Math.asin( $($element).height() / $scope.heightStart ) );

	    	});

	    	// for some reason had to put a delay here cause if not the height is returned incorrect;

	    	$timeout( function(){
	    		$scope.heightStart = $($element).outerHeight();
	    	}, 100 );
	    	
	    }
	  };
	}]);

});	