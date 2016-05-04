define(['./module'], function (directives) {

  directives.directive("zappiFormImageSelect", ["$timeout","$rootScope", function($timeout,$rootScope){
    return {
      restrict: 'E',
      scope: {
        options: "=",
        selected: '=',
        isVisible: '=?',
        columns: "=",
        imageHeight: '=?',
        optionWidth: '=?',
        onChange: '=?',
        name: "@",
        filter: "=?",
        hideIndicator: "=?",
        selectedImageClass: "@",
        skin: '=',
        imageClass: "@"
      },
      link: function($scope, $element, $attributes) {

        $scope.getLabel = function(option){
          return "label";
        }

        // Makes sure that the all elements are equal height. In some casese with small numbers of columns
        // the height of the text label cause poor layout to all are set to the maximum option height to
        // ensure consistancy in appearance

        $scope.updateHeight = function(){
          $timeout( function(){
            $scope.minimumOptionHeight = 0;
            angular.forEach( $element.find('.option'), function(v){
              $scope.minimumOptionHeight = $(v).height() > $scope.minimumOptionHeight ? $(v).height() : $scope.minimumOptionHeight;
            });
          }, 50);
        }

        $scope.$watch( 'items', function(){
          $scope.updateHeight();
        },true)

        $scope.imageHeight = $scope.imageHeight==undefined ? 200 : $scope.imageHeight;
        $scope.optionWidth = ( $scope.optionWidth==undefined ? 100/$scope.columns : 100 ).toString().concat('%');

        $scope.getImageClass = function(item){
          if(item.value.label)
            return item.value.label
          return item.value;
        }

        $scope.select = function(v){
          $scope.selected = v;
          if( $scope.onChange )
            $scope.onChange(v);
        }

        $scope.getOptionLabel = function(v){
          return v.key;
        }

        $scope.getImage = function(v){
          return typeOf(v.value)=="string" ? v.value : ( typeOf(v.value)=="object" ? v.value.image : v.value );
        }

        $rootScope.$on( 'zappi.form.page.change', function(){
          $scope.updateHeight();
        });

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_form_image_select.html'
    };
  }]);

});