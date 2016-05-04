define(['../module'], function (directives) {

  directives.directive("deRightPanelPlaceholder", ["$timeout", function(){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	pageNavigationModel: "=?"
	    },
	    controller: function( $scope, $element ){

	    	$scope.currentSelectedCountry = { key: 'United Kingdom', value: 'UK' }
			$scope.currentCompletions = 100;
			$scope.currentTime = "3hrs";
			$scope.currentPrice = "£1000";

	    },
	    templateUrl: '/prototypes/design-elements/html-partials/right-panel-place-holder.html'
	  };
	}]);

});