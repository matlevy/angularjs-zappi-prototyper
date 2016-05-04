define(['./module'], function (directives) {

  directives.directive("zappiPhraseComplete", ["$timeout", function(){
    return {
      restrict: 'E',
      scope: {
        options: "=",
        selected: '=',
        isVisible: '=',
        columns: "@",
        onChange: '=',
        name: "@",
      },
      transclude: true,
      link: function($scope, $element, $attributes) {

        $scope.getLabel = function(option){
          return "label"; //option["key"] != undefined ? option["key"] : option;
        }

        $scope.imageHeight = $scope.imageHeight==undefined ? 200 : $scope.imageHeight;
        $scope.columnWidth = ( $scope.columnWidth==undefined ? 100/$scope.columns : 100 ).toString().concat('%');

        $scope.select = function(v){
          $scope.selected = v;
          if( $scope.onChange!=undefined && $scope.onChange!=null )
              $scope.onChange(v);
        }

        $scope.getOptionLabel = function(v){
          return v.key;
        }

        $scope.getImage = function(v){
          return typeOf(v.value)=="string" ? v.value : ( typeOf(v.value)=="object" ? v.value.image : v.value );
        }

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_phrase_complete.html'
    };
  }]);

});