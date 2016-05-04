define(['../module'], function (directives) {

  directives.directive("dcHeader", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'E',
	    transclude: true,
	    controller: function( $scope, $element ){
	    	if($route.current.params.header){
	    		$scope.headerURL = '/prototypes/datacollector/proto/_headers/' + $route.current.params.header + '.html';
	    	} else {
	    		$scope.headerURL = '/prototypes/datacollector/proto/_headers/_blank.html';
	    	}
	    },
	    template: '<div ng-include="headerURL"></div>'
	  };
	}]);

});