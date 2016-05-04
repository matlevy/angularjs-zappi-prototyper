define(['../module'], function (directives) {

  directives.directive("zappiFooterNavigation", ["$timeout", "$interval", function($interval){
	  return {
	    restrict: 'A',
	    link: function( $scope, $element ){
	    	
	    	$(window).on('scroll', function(e){
	    		if( ( $(window).height()-$(document).height() + $(window).scrollTop() ) > -10 ){
	    			$element.addClass('visible')
	    		} else {
	    			$element.removeClass('visible')
	    		}
	    	});

	    }
	  };
	}]);

});	