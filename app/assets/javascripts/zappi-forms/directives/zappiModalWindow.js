define(['./module'], function (directives) {

  directives.directive("zappiModalWindow", ["$timeout", "$rootScope", function($timeout, $rootScope){
	  return {
	    restrict: 'E',
	    scope: {
	    	modal: "=?"
	    },
	    controller: function($scope, $element) {

	    	if( 'modal'=='' )
	    		modal = "/angular/templates/zappi_forms/blank.html"

	    	$scope.close = function(){
	    		$rootScope.$broadcast( 'zappistore.view.modal.close' );
	    	}

	    },
	    templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_modal_window.html'
	  };
	}]);

});