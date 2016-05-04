define(['./module'], function (directives) {

  directives.directive("zappiTextInput", ["$timeout", "$interval", function($timeout,$interval){
    return {
      restrict: 'E',
      scope: {
        value: "=",
        type: "@",
        label: "@"
      },
      link: function($scope, $element) {   

        if( $scope.value=="" ){
          $scope.state = 'edit';
        } else {
          $scope.state = "saved";
        }

        if($scope.type==null||$scope.type==undefined)
          $scope.type = 'single'

        $scope.toggleState = function(){
          $scope.state = ($scope.state=='edit') ? 'saved' : 'edit';
          if($scope.state=='edit'){
            $timeout(function(){
              $element.find('.zappi-text-input:visible').focus();
              $element.find('.zappi-text-input:visible').select();
            }, 50);
          }
        }

        $element.on('keyup', function(e){
          if(e.target.tagName=='TEXTAREA'){
            $(e.target).height( 0 );
            $(e.target  ).height( e.target.scrollHeight );
          } else {
            if(e.which==13){
              $scope.state = 'saved';
              $scope.$apply();
            } else if(e.which==27) {
              $scope.value = "";
            }
          }
        });

        $element.find('.zappi-text-input').on('blur', function(e){
          if($scope.value!=''){
            $scope.state = 'saved';
            $scope.$apply();
            console.log('sdfsdf');
          }
        });

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_text_input.html'
    }
  }]);

});