define(['./module'], function (directives) {

  directives.directive("zappiInstructionsStep", ["$timeout", function(){
      return {
        restrict: 'A',
        scope: {
        	instructionsModel: "=",
        	instructionsTitle: "@",
        	instructionsLocation: "@",
        	instructionsNextText: "@",
            instructionsPrevText: "@",
            instructionsPosition: "@",
            preBroadCast: "@",
            postBroadCast: "@",
        },
        link: function($scope, $element, $attributes) {

            if( $scope.preBroadCast == null )
                $scope.preBroadCast = "";

            if( $scope.postBroadCast == null )
                $scope.postBroadCast = "";

            $scope.instructionsModel.instructions.push(
                { 
                title: $scope.instructionsTitle, targetId: $attributes.id , copy: $($element).find('.instructions-text').html(), 
                nextText: $scope.instructionsNextText, previousText: $scope.instructionsPrevText, preBroadCast: $scope.preBroadCast.split(','), postBroadCast: $scope.postBroadCast.split(','),
                options: { tipLocation: $scope.instructionsLocation } }
            )
        }
      };
    }]);

});