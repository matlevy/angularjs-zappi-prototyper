define(['./module'], function (directives) {

  directives.directive("zappiPageIndicator", ["$timeout", '$rootScope', '$route', function( $timeout, $rootScope, $route ){
	  return {
	    restrict: 'E',
	    scope: {
	    	formPageModel: "="
	    },
	    controller: function( $scope, $element ) {

	    	// See: zappiFormPageNavigator for comments regarding this. Could be abstracted into common class
	    	
	    	$scope.gotoPage = function(page){
	    		if( $scope.canGotoPage(page) ){
	    			if( $scope.formPageModel.gotoPage ){
	    				$scope.formPageModel.gotoPage( page ); // Preffered new way using VO;
	    			} else {
	    				$scope.formPageModel.current_page = $scope.formPageModel.pages[ $scope.formPageModel.pages.indexOf(page) ];
	    			}
	    			$route.updateParams({
			            page: $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page )
			        })
	    		}
	    	}

	    	$scope.canGotoPage = function(page){
	    		return $scope.formPageModel.pages.indexOf( page ) < $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page ) || page.completed || page.started;
	    	}

	    	$scope.isCurrentPage = function(page){
	    		return $scope.formPageModel.pages.indexOf( page ) == $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page );	
	    	}
	    },
	    templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_page_indicator.html'
	  };
	}]);

});