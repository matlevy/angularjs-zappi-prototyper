define(['./module'], function (directives) {

  directives.directive("zappiSingleSelectOption", ["$timeout", function($timeout){
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        options: '=',
        selected: '=',
        isVisible: '=?',
        buttonClass: '@',
        allowCustomValue: '@',
        customValueLabel: '@',
        customValue: '@',
        filter: '=?',
        onItemSelected: "="
      },
      link: function($scope, $element) {

        if( $scope.isVisible==null || $scope.isVisible==undefined )
          $scope.isVisible = true;

        $scope.customValue = null;
        
        $scope.getLabel = function(option){
          return option["key"] != undefined ? option["key"] : option;
        }

        $scope.setValue = function(v){
          $scope.selectedCustomValue = false;
          $scope.selected = v;
          $scope.customValue = null;

          if( $scope.onItemSelected ){
            $scope.onItemSelected(v);
          }
        }

        $scope.$watch( 'customValue', function(v){
          if (v && v !== ""){
            $scope.selectedCustomValue = true;
            $scope.selected = v;
            if($scope.onSelected)
              $scope.onItemSelected(v);
          } else {
            $scope.selectedCustomValue = false;
            $scope.customValue = null;
          }
        }, true);

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_single_select_options.html'
    };
  }]);

});