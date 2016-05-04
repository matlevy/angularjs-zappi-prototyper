define(['../module'], function (directives) {

  directives.directive("fluidModalToolbar", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	isVisible: '='
	    },
	    controller: function( $scope, $element ){
	    	$scope.close = function(){
	    		$scope.$emit( 'app.close_modal' );
	    	}
	    },
	    templateUrl: '/prototypes/fluid/html-partials/modal_toolbar.html'
	  };
	}]);

});