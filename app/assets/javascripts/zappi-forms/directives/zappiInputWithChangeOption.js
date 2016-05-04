define(['./module'], function (directives) {

  directives.directive("zappiInputWithChangeOption", ["$timeout", function(){
    return {
      restrict: 'E',
      scope: {
        selected: '=',
        options: '=',
        buttonClass: '@',
        allowCustomValue: '@',
        customValueLabel: '@'
      },
      link: function(sc, el, at) {

        sc.optionsVisible = false;
        sc.customValue = null;

        sc.getLabel = function(option){
          return option["key"] != undefined ? option["key"] : option;
        }
        
        sc.toggleOptional = function(){
          sc.optionsVisible = !sc.optionsVisible;
        }

        sc.setValue = function(v){
          sc.selectedCustomValue = false;
          sc.selected = v;
          sc.toggleOptional();
        }

        sc.$watch( 'selectedOption', function(v){
          
        }, true);

        sc.$watch( 'customValue', function(v){
          if (v && v !== "")
            sc.selectedCustomValue = true;
          else
            sc.selectedCustomValue = false;
        }, true);

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_input_with_change_option.html'
    };
  }]);

});