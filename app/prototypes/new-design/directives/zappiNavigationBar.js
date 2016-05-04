define(['../module'], function (directives) {

  directives.directive("zappiNavigationBar", ["$timeout", "$interval", function($interval){
	  return {
	    restrict: 'A',
	    link: function( $scope, $element ){
	    	
	    	$(window).on('scroll', function(e){

	    		$scope.scrollChange = $(window).scrollTop() - $scope.scroll;
	    		$scope.scroll = $(window).scrollTop();

	    		if( $(window).scrollTop() > 50 && $scope.scrollChange>0 ){
	    			$element.addClass('offscreen')
	    		} else {
	    			$element.removeClass('offscreen')
	    		}
	    	});

	    	$scope.scroll = $(window).scrollTop();
	    	$scope.scrollChange = 0;

	    }
	  };
	}]);

});	