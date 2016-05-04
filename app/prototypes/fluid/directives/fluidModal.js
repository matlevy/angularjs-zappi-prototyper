define(['../module'], function (directives) {

  directives.directive("fluidModal", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	isVisible: '=',
	    	formModel: '=?'
	    },
	    controller: function( $scope, $element ){
	    	
	    },
	    templateUrl: '/prototypes/fluid/html-partials/modal_window.html'
	  };
	}]);

});