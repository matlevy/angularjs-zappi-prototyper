define(['../module'], function (directives) {

  directives.directive("fluidBrowser", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'A',
	    scope: {
	    	activePackage: "=?"
	    },
	   	controller: 'FLUIDContainerController',
	    templateUrl: '/prototypes/fluid/html-partials/browser.html'
	  };
	}]);

});