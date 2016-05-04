define(['../module'], function (directives) {

  directives.directive("fluidModalForm", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	data: '=',
	    	form: '=',
	    	formAction: "="
	    },
	    controller: function( $scope, $element ){

	    	$scope.close = function(){
	    		$scope.$emit( 'app.close_modal' );
	    	}
	    	$scope.submit = function(){
	    		$scope.$emit( 'app.submit_modal_form', $scope.formAction, $scope.data );
	    	}
	    },
	     template: '<div ng-include="form"></div>'
	  };
	}]);

});