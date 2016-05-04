define(['./module'], function (directives) {

  directives.directive("zappiFormImageGrid", ["$timeout", function($timeout){
    return {
      restrict: 'E',
      scope: {
        items: "=",
        columns: "=",
        imageHeight: '=?',
        optionWidth: '=?',
        onClick: '=?',
        pageRows: '=?',
        buttonPosition: '=?',
        canEdit: '=?'
      },
      transclude: true,
      link: function($scope, $element, $attributes) {

        if( $scope.buttonPosition==null )
          $scope.buttonPosition = 'above'

        if( $scope.buttonPosition==null )
          $scope.buttonPosition = false;

        $scope.imageHeight = $scope.imageHeight==undefined ? 200 : $scope.imageHeight;
        $scope.optionWidth = ( $scope.optionWidth==undefined ? 100/$scope.columns : 100 ).toString().concat('%');

        $scope.currentPage = 0;

        if( $scope.pageRows == null || $scope.pageRows == undefined )
          $scope.pageRows = 2;

        $scope.emitEvent = function(event){
          $scope.$emit(event);
        }

        $scope.updateHeight = function(){
          $timeout( function(){
            $scope.minimumGalleryHeight = Math.floor( $element.find('.option').length  / $scope.columns ) * $($element.find('.option')[0]).height();
          }, 50);
        }

        $scope.previousPage = function(){
          $scope.currentPage -= ( ( $scope.currentPage > 0 ) ? 1 : 0 );
          $scope.updateHeight();
        }

        $scope.nextPage = function(){
          $scope.currentPage += ( ( $scope.currentPage <  ( ( $scope.items.length / ( $scope.pageRows * $scope.columns ) ) - 1 ) ) ? 1 : 0 );
          $scope.updateHeight();
        }

        $scope.pageFilter = function(value,index,array){
          return Math.floor( index / ( $scope.pageRows * $scope.columns ) ) == $scope.currentPage;
        }

        $scope.select = function(v){
          if( $scope.onClick )
            $scope.onClick(v);
        }

        $scope.getOptionLabel = function(v){
          return v.key;
        }

        $scope.getImage = function(v){

          if( v.media != null ){
            return media.thumbnail;
          }
          
          return typeOf(v.value)=="string" ? v.value : ( typeOf(v.value)=="object" ? v.value.image : v.value );
        }

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_form_image_grid.html'
    };
  }]);

});