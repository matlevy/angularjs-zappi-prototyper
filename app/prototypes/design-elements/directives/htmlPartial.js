define(['../module'], function (directives) {

  directives.directive("htmlPartial", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	partial: "?"
	    },
	    controller: function( $scope, $element ){
	    	$scope.formURL = $scope.partial;
	    },
	    template: '<div ng-include="formURL"></div>'
	  };
	}]);

});