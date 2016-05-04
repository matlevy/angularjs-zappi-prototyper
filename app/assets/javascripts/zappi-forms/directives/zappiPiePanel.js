define(['./module'], function (directives) {

  directives.directive("zappiPiePanel", ["$timeout", "$interval", function($timeout,$interval){
    return {
      restrict: 'E',
      scope: {
        percent: "=?",
        panelValue: "=?",
        showDivisions: "=?",
      },
      link: function($scope, $element, $attributes) {    
        $timeout( function(){
          $scope.$watch( 'panelValue', function(v){
            TweenMax.to( $($element).find('.dial'), 0.5, {
                  rotation: 180 * v,
                  scaleX:1, 
                  transformOrigin:"50px 50px"
              });
          });
        },500);

        $scope.showHideDivision = function(){
          $scope.showDivisions = !$scope.showDivisions;
        }
      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_pie_panel.html'
    }
  }]);

});