define(['./module'], function (directives) {

  directives.directive("zappiMultiSelectOption", ["$timeout", function(){
    return {
      restrict: 'E',
      scope: {
        options: "=",
        selected: '=',
        isVisible: '=?',
        buttonClass: '@',
        allLabel: '@',
        filter: "=?",
        selectAllByDefault: "=",
        onItemSelect: "=",
        onSelectedChange: "=",
        allowSelectAll: '@',
        labelFunction: "=?",
      },
      link: function($scope, $element, $attributes) {

        $scope.allowSelectAll = $scope.allowSelectAll==null ? true : false;

        if( $scope.isVisible==null || $scope.isVisible==undefined )
          $scope.isVisible = true;

        $scope.getLabel = function(option){
          
          if( $scope.labelFunction )
            return $scope.labelFunction(option);
          
          return option["key"] != undefined ? option["key"] : option;
        }

        if( $scope.selected != null ){
          if( typeof $scope.selected=="string" ){
            $scope.selected = $scope.selected.split(',');
          } else {
            if( $scope.selectAllByDefault == "true" || $scope.selectAllByDefault==true ){
              $scope.selected = $scope.options.slice(0);
            } else {
              $scope.selected = [];
            }
          }
        } else {
          if( $scope.selectAllByDefault == "true" || $scope.selectAllByDefault==true ){
            $scope.selected = $scope.options.slice(0);
          } else {
            $scope.selected = [];
          }
        }

        $scope.toggleValue = function(v){
          if( $scope.selected.indexOf(v) == -1 ){
            $scope.selected.push(v);
            if($scope.onItemSelect)
              $scope.onItemSelect(v);
          } else {
            $scope.selected.splice( $scope.selected.indexOf(v), 1 );
          }  
        }

        $scope.isSelected = function(v){
          return $scope.selected.indexOf(v) != -1;
        }

        $scope.selectAll = function(){
          $scope.selected = $scope.options.slice(0);
        }

        $scope.$watch( 'selected', function(v){
          if($scope.onSelectedChange)
              $scope.onSelectedChange(v);
        }, true );

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_multi_select_options.html'
    };
  }]);

});