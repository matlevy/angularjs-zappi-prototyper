define(['../module'], function (directives) {

  directives.directive("createNewPackage", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'A',
	    scope: {
	    	activePackage: "=?",
	    	state: "=?"
	    },
	   	controller: 'FLUIDPackageCreationController',
	    templateUrl: '/prototypes/fluid/html-partials/create_new_package.html'
	  };
	}]);

});