define(['./module'], function (directives) {

  directives.directive("zappiDatePicker", ["$timeout", "$interval", function($timeout,$interval){
    return {
      restrict: 'E',
      scope: {
        options: "=?",
        onChange: "=?"
      },
      controller: function( $scope, $element ) {
        $scope.defaultOptions = {
          format:'DD/MM/YYYY'
        }

        $scope.showDatePicker = function(){
            $($element).find('.date').data('DateTimePicker').show();
        }

      },
      link: function($scope, $element, $attributes) {
        console.log($scope.options);
        console.log($scope.defaultOptions);

         $($element).find('.date').datetimepicker( $scope.options || $scope.defaultOptions );

         $element.on('dp.change', function( e ){
            if( $scope.onChange ) {
              $scope.onChange( e.date, e.oldDate );
              $element.datetimepicker.hide();
            }
         });

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_date_picker.html'
    }
  }]);

});
