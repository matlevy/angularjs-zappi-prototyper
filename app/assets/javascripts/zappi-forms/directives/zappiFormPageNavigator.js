define(['./module'], function (directives) {

  directives.directive("zappiFormPageNavigator", ["$timeout", "$rootScope", "$routeParams", "$route", function($timeout,$rootScope,$routeParams,$route){
    return {
      restrict: 'E',
      scope: {
        formPageModel: "=",
        view: '@',
      },
      controller: function( $scope, $element ) {

        $scope.getFirstPage = function(){
          return $scope.formPageModel.pages[ 0 ];
        }

        // Standard page navigation methods. Maybe should be abstracted out to some kind of abstract class / helper or something
        // I can see this logic being used a lot within the form elements

        $scope.hasPreviousPage = function(){
          return $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page ) > 0;
        }

        $scope.hasNextPage = function(){
          return $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page ) < $scope.formPageModel.pages.length-1; 
        }

        $scope.gotoNextPage = function(){
          if( $scope.hasNextPage() && $scope.formPageModel.current_page.valid ){
            $scope.formPageModel.current_page.completed = true;
            $scope.formPageModel.current_page = $scope.formPageModel.pages[ $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page ) + 1 ];
            $scope.formPageModel.current_page.started = true;
            $route.updateParams({
              page: $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page )
            })
            $rootScope.$broadcast('zappi.form.page.change');
          } else {
            $rootScope.$broadcast( "zappi.forms.complete");
          }
        }
        
        $scope.gotoPreviousPage =  function(){
          $scope.formPageModel.current_page = $scope.formPageModel.pages[ $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page ) - 1 ];
          $route.updateParams({
            page: $scope.formPageModel.pages.indexOf( $scope.formPageModel.current_page )
          })
          $rootScope.$broadcast('zappi.form.page.change');
        }

        $timeout( function(){
          if( $scope.formPageModel.current_page == null )
            $scope.formPageModel.current_page = $scope.getFirstPage();

          if( $routeParams.page!=null )
            $scope.formPageModel.current_page = $scope.formPageModel.pages[ Number($routeParams.page) ];

        }, 100);

      },
      templateUrl: function( $element, $attributes ) {
        return $attributes.view;
      }
    };
  }]);

});