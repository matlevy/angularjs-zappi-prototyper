define(['../module'], function (directives) {

	/** This is just a quick utility directive for design to customise the header area and not to be used in production **/

  directives.directive("protoCustomiseHeader", ["$route", "$routeParams", function($route, $routeParams){
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	pageModel: "=?",
	    	pageTitle: "@",
	    	headerTitle: "@",
	    	headerSkin: "@",
	    	headerArtworkClass: "@",
	    },
	    controller: function( $scope, $element ){

	    	$scope.pageModel.page_title = $scope.pageTitle!=null ? $scope.pageTitle : "";
	    	
	    	if( $scope.headerTitle )
	    		$scope.pageModel.title = $scope.headerTitle;

	    	if( $scope.headerSkin )
	    		$scope.pageModel.skin = $scope.headerSkin;

	    	if( $routeParams.skin )
	    		$scope.pageModel.skin = $routeParams.skin;

	    	if( $routeParams.headerImage )
	    		$scope.pageModel.headerImage = $routeParams.headerImage;
	    }
	  };
	}]);

});