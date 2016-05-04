define(['./module'], function (directives) {

  directives.directive("zappiMediaPlaceholder", ["$timeout", "$interval", function($timeout,$interval){
    return {
      restrict: 'E',
      transclude: false,
      scope: {
      	media: "="
      },
      link: function($scope, $element, $atttributes) {
        
        $scope.$watch( 'media.video', function(v){
          if( v!=undefined ){
            $element.find("video").attr('src', v);
            $element.find("video").load();
          }
        });
        
      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_media_placeholder.html'
    }
  }]);

});