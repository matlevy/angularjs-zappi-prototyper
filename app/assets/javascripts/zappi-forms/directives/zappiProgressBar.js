define(['./module'], function (directives) {

  directives.directive("zappiProgressBar", ["$timeout", "$interval", function($timeout,$interval){
    return {
      restrict: 'E',
      scope: {
        isVisible: "=",
        progress: "="
      },
      link: function($sc, $el, $at) {
        
        
        
      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_progress_bar.html'
    }
  }]);

});