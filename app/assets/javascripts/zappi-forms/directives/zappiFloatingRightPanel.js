define(['./module'], function (directives) {

  directives.directive("zappiFloatingRightPanel", ["$timeout", function($timeout){
    return {
      restrict: 'A',
      scope: {
        threshold: '@'
      },
      link: function($sc, $el, $at) {
        $timeout( function(){
          $(window).on('scroll', function(){
            if( $(window).scrollTop() > $sc.threshold ){
             //$($el).css('position', 'absolute');
            } else {
              //$($el).css('position', 'relative');
            }
          } );
        },200);      
      }
    }
  }]);

});