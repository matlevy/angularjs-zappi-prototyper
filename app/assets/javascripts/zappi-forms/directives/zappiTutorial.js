define(['./module', 'joyride'], function (directives) {

  directives.directive("zappiTutorial", ['$rootScope', '$sce', '$timeout', '$interval', '$timeout', function($rootScope, $sce, $timeout, $interval, $timeout){
    return {
      restrict: 'E',
      scope: {
        tutorialModel: "=",
        startLabel: "@",
        closeLabel:"@",
        type: "@"
      },
      transclude: true,

      controller: function($scope, $element){

        if( $scope.type==null )
          $scope.type == "form"

        $scope.view = $scope.type=="form" ? '/angular/templates/zappi_forms/zappi_tutorial.html' : '/angular/templates/zappi_forms/zappi_tutorial_panel.html'

        $scope.tutorialModel.tutorialStarted = false;
        $scope.tutorialModel.showTutorial = true;
        $scope.tutorialModel.guideStarted = false;

        $scope.getOptions = function(tip){
          var permittedOptions = ['tipLocation','nubPosition'];
          var options = [];

          for( var i=0; i<permittedOptions.length; i++){
            if( tip.options && tip.options[ permittedOptions[i] ]!=null ){
              options.push( permittedOptions[i] + ":" + tip.options[ permittedOptions[i] ] + "");
            }
          }

          return options.join(',');
        }

        $scope.startTutorial = function(){
          $scope.tutorialModel.tutorialStarted = true;
        }

        $scope.hideTutorial = function(neverShow){
          $scope.tutorialModel.showTutorial = false;
          $rootScope.$broadcast('creativetest.exitDemo');
        }

        $scope.endTutorial = function(){
          $scope.tutorialModel.showTutorial = false;
          $rootScope.$broadcast('creativetest.reset');
          $rootScope.$broadcast('creativetest.exitDemo');
        }

        $scope.startGuide = function(){
          $scope.tutorialModel.showTutorial = false;
          $timeout( function(){
            $scope.tutorialModel.guideStarted = true;

            if( $scope.joyrider ){
              $($scope.joyrider).joyride("destroy");
            }
            
            $scope.joyrider = $($element).find('.tutorial-steps').joyride({
              autoStart : true,
              preStepCallback : function( index, tip ){
                $scope.onPreStep(index);
              },
              postStepCallback : function (index, tip) {
                $scope.onPostStep(index);
              },
              postRideCallback : function (index, tip) {
                $scope.onTutorialComplete(index);
              },
                modal:true,
                expose:true,
                scrollSpeed: 800,
                scroll: true,
                nubPosition: 'auto',
                tipContainer: '.zappi-styles'
            });
          }, 1000 );
          $rootScope.$broadcast('creativetest.setToDemoMode');
        }

        $scope.onPreStep = function(index){
          $rootScope.$broadcast('tutorial.creativetest.prestep', index );
          if($scope.tutorialModel.instructions[index] && $scope.tutorialModel.instructions[index].preBroadCast){
            angular.forEach( $scope.tutorialModel.instructions[index].preBroadCast, function(v){
              if(v!="")
                $rootScope.$broadcast( v, index );
            });
          }

          $('body,html').trigger('scroll');
        }

        $scope.onPostStep = function(index){
          $rootScope.$broadcast('tutorial.creativetest.poststep', index );

          $(window).scrollTop(0);

          if($scope.tutorialModel.instructions[index] && $scope.tutorialModel.instructions[index].postBroadCast){
            angular.forEach( $scope.tutorialModel.instructions[index].preBroadCast, function(v){
              if( v!= "")
                $rootScope.$broadcast( v, index );
            });
          }

          $(window).trigger('scroll');
        }

        $scope.onTutorialComplete = function(){
          $rootScope.$broadcast('creativetest.reset');
          $rootScope.$broadcast('creativetest.exitDemo');
        }

      },

      link: function($scope, $element, $attributes) {
        $($element).find('.tutorial-steps').hide();
      },
      template: '<div ng-include="view"></div>'
    }
  }]);

});