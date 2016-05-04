define(['../module'], function ( module ) {

  module.directive("zappiSurveySummary", ["$timeout", "$interval", function($interval){
	  return {
	    restrict: 'E',
	    scope: {
	    	orderSummary: "=",
	    	surveyClasses: "@"
	    },
	    controller: function( $scope, $element ){
	    	
	    },
	    templateUrl: "/prototypes/new-design/partials/survey_summary.html"
	  };
	}]);

});	