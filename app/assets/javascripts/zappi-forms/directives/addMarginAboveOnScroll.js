define(['./module'], function (directives) {

  directives.directive("addMarginAboveOnScroll", ["$timeout", function($timeout){
    return {
      restrict: 'A',
      scope: {
        threshold: "@",
        isActive: "="
      },
      link: function($sc, $el, $at) {

        $timeout( function(){

          $(window).on('scroll', function(){
            if( $(window).scrollTop() > $sc.threshold && $sc.isActive ){
              $($el).height($(window).scrollTop() - $sc.threshold );
            } else {
              $($el).height(0);
            }
          } );
        },200);

        $sc.$watch('isActive', function(v){
          if(v==false){
            $($el).height(0);
          }
        })

      }
    };
  }]);

});