define(['./module'], function (directives) {

  directives.directive("zappiToggleButton", ["$timeout", function(){
    return {
      restrict: 'E',
      scope: {
        selected: '=',
        disabled: '=',
        unselectedLabel: '@',
        selectedLabel: '@',
        id: "@",
        class: "@"
      },
      link: function(sc, el, at) {

        sc.toggle = function(){
          sc.selected = !sc.selected;
        }

        if( at.classes ){
          var classes = at.classes.replace('\s','').split(',');

          angular.forEach( classes, function(v,i){
            $(el).addClass(v);
          });
        }

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_toggle_button.html'
    };
  }]);

});