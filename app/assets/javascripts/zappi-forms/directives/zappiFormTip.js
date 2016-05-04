define(['./module'], function (directives) {

  directives.directive("zappiFormTip", ["$timeout", function(){
	  return {
	    restrict: 'E',
	    scope: true,
	    transclude: true,
	    link: function($sc, $el, $at) {

	      

	    },
	    templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_form_tip.html'
	  };
	}]);

});