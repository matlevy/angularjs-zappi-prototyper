define(['./module'], function (directives) {

  directives.directive("mmrMediaConfig", ["$timeout", 'MediaObjectService', function($timeout, MediaObjectService){
      return {
        restrict: 'E',
        scope: {
        	mediaObject: "=",
          useAltProductInfo: "=",
        },
        controller: function($scope, $element) {

          $scope.useAltProductInfo = false;

          $scope.onPackRangeChosen = function(v){

            console.log(v);
              v.state = MediaObjectService.states.UPLOADED;
              $scope.mediaObject.range_media = v;
          }

          $scope.onPackRangeRemoved = function(){
              $scope.mediaObject.range_media = null;   
          }

        },
        templateUrl: '/prototypes/mmr/media_object.html'
      };
    }]);

});