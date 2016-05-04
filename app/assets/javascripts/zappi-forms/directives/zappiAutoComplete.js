define(['./module'], function (directives) {

  directives.directive("zappiAutoComplete", ["$timeout", "$animate", function($timeout, $animate){
    return {
      restrict: 'E',
      scope: {
        isVisible: '=',
        options: "=",
        selected: "=",
        placeHolder: "@"
      },
      link: function($sc, $el, $at) {

        $animate.enabled(false,$el);

        $sc.search = function(v,i){

          if( v.key.toLowerCase() == $sc.searchText.toLowerCase() )
            $sc.selected == v.key;

          if(v.key.toLowerCase().indexOf($sc.searchText.toLowerCase())!=-1)
            return v!=$sc.selected ? true : false;
        }

        $sc.clearSelected = function(){
          $sc.selected=null;
          $sc.showAll=false;
          $sc.searchText = "";
          $timeout(function(){
            $el.find('.search').focus();
          }, 100);
        }

        $sc.searchText = "";
        $sc.showAll = false;

        $sc.toggleShowAll = function(){
          $sc.showAll = !$sc.showAll;
        }

        $sc.$watch( 'searchText', function(v){
          if(v.length>0)
            $sc.showAll=false;
        } );

        $sc.$watch( 'showAll', function(v){
          if(v==true)
            $sc.searchText = "";
        } );

        $sc.$watch( 'selected', function(v){
          if(v!=null)
            $sc.searchText = "";
        });

        $sc.getLabel = function(option){
          if(option==null)
            return ""
          return option["key"] != undefined ? option["key"] : option;
        }

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_auto_complete.html'
    };
  }]);

});