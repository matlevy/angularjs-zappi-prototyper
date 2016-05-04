define(['../module'], function (directives) {

  directives.directive("deFormPrototype", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'E',
	    transclude: true,
	    controller: function( $scope, $element ){
	    	$scope.formURL = '/prototypes/' + $route.current.params.prototype_name + '/demo.html';
	    },
	    template: '<div ng-include="formURL"></div>'
	  };
	}]);

});