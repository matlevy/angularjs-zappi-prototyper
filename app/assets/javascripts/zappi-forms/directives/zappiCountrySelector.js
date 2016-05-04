define(['./module'], function (directives) {

  directives.directive("zappiCountrySelector", ["$timeout", function(){
	  return {
	    restrict: 'A',
	    scope: true,
	    link: function(sc, el, at) {
	    	scope.country = attr.currentCountry;
	    }
	  };
	}]);

});