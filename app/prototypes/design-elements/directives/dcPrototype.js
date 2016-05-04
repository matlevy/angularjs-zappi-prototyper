define(['../module'], function (directives) {

  directives.directive("dcPrototype", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'E',
	    transclude: true,
	    controller: function( $scope, $element ){
	    	$scope.formURL = '/prototypes/datacollector/proto/' + $route.current.params.prototype_name + '/demo.html';
	    	$scope.showQuestion = true;

	    	$scope.hideQuestion = function(){
				$scope.showQuestion = false;
			}

	    },
	    template: '<div ng-include="formURL"></div>'
	  };
	}]);

});