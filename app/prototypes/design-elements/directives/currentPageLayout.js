define(['../module'], function (directives) {

  directives.directive("deCurrentPageLayout", ["$timeout", function(){
	  return {
	    restrict: 'E',
	    transclude: true,
	    templateUrl: '/prototypes/design-elements/html-partials/current-page-layout.html'
	  };
	}]);

});