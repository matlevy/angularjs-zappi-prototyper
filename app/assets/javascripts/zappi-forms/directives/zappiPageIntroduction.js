define(['./module'], function (directives) {

  directives.directive("zappiPageIntroduction", ["$timeout", function(){
    return {
      restrict: 'E',
      scope: {
      	hideWhen: "=?",
        startLabel: "@",
      },
      transclude: true,
      controller: function( $scope, $element ){

        $scope.isHidden = false;

        if( $scope.startLabel==null || $scope.startLabel==undefined )
          $scope.startLabel = "OK, Thanks"

        $scope.hideMe = function(){
          $scope.isHidden = true;
        }
      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_page_introduction.html'
    };
  }]);

});