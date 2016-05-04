define(['./module'], function (directives) {

  directives.directive("zappiFormPage", ["$timeout", function($timeout){
    return {
      restrict: 'E',
      scope: {
        formPageModel: "=",
        pageId: "@",
        pageTitle: "@",
        pageIndex: "=?",
        pageObject: "=?",
        noRightPanel: "@"
      },
      transclude: true,
      controller: function( $scope, $element ) {

        // Creates an object to represent a form page. This should probably be moved to a service factory
        $scope.pageObject = { index: $scope.pageIndex, id: $scope.pageId, title: $scope.pageTitle, tutorial: { instructions: [] }, completed: false, valid: true, no_right_panel: $scope.noRightPanel=='true' };

        console.log( $scope.pageObject );

        // Set default $scope values if not set
        if( $scope.formPageModel.pages == null )
          $scope.formPageModel.pages = [];

        if( $scope.formPageModel.current_page == null )
          $scope.formPageModel.current_page = null;

        if( $scope.pageIndex!=null ){
          $scope.formPageModel.pages[ Number($scope.pageIndex) ] = $scope.pageObject;
        } else {
          $scope.formPageModel.pages.push( $scope.pageObject );
        }
 
        // Use within the teplate to understand if the page rendered is the current page (i.e. to show/hide)
        $scope.isCurrentPage = function(){
          return $scope.formPageModel.current_page === $scope.pageObject;
        }

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_form_page.html'
    };
  }]);

});