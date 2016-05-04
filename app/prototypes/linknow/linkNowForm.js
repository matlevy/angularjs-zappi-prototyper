define(['./module'], function (directives) {

  directives.directive("linknowForm", ["$timeout", function(){
	  return {
	    restrict: 'E',
	    transclude: {
	    	models: "=",
	    },
	    templateUrl: '/prototypes/linknow/link_now_form.html'
	  };
	}]);

});