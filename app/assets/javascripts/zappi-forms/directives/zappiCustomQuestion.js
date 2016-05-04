define(['./module'], function (directives) {

  directives.directive("zappiCustomQuestion", ["$timeout", "$interval", "ZappiQuestionService", function($timeout,$interval,ZappiQuestionService){
    return {
      restrict: 'E',
      scope: {
        questions: '=',
        tutorialModel: '=',
        maxPermitteds: "=",
        newQuestionText: "=?",
      },
      controller: function( $scope, $element ) {

        $($element).find('.question-input').on('keyup', function(e){
          if(e.which==13||e.keyCode==13){
            $timeout(function(){
                $scope.addCustomMultiChoiceQuestion( $scope.newQuestionText );
                $scope.newQuestionText="";
              }, 50);
          }
        })

        $scope.toggleRandomise = function( question ){
          question.randomise = !question.randomise;

          if(!question.randomise){
            angular.forEach( question.answers, function( answer_item ){
              answer_item.isFixed=false;
            })
          };
          
        }

        $scope.toggleMultiChocie = function( question ){
          question.is_multiple_choice = !question.is_multiple_choice;
        }

        $scope.addCustomMultiChoiceQuestion = function( text ){
          $scope.questions.push( ZappiQuestionService.createQuestion( "multiple-choice", text ) );
        }

        $scope.removeQuestion = function( question ){
          $scope.questions.splice( $scope.questions.indexOf( question ),1 );
        }

        $scope.moveQuestionUp = function( question ){
          var __currentIndex = $scope.questions.indexOf( question )

          if( __currentIndex>0 ){          
            $scope.questions.splice( __currentIndex, 1 );
            $timeout( function(){
              $scope.questions.splice( __currentIndex-1, 0, question );  
            }, 800 );
          }
        }

        $scope.moveQuestionDown = function( question ){
          var __currentIndex = $scope.questions.indexOf( question )

          if( __currentIndex < $scope.questions.length-1 ){          
            $scope.questions.splice( __currentIndex, 1 );
            $timeout( function(){
              $scope.questions.splice( __currentIndex+1, 0, question );  
            }, 800 );
          }
        }

        $scope.copyQuestion = function( question ){
          var __currentIndex = $scope.questions.indexOf( question );
          var __newQuestion = question.clone();

          $scope.questions.splice( __currentIndex, 0, __newQuestion ); 
        }

        $scope.createAnswer = function( answer ){
          
        }

      },
      link: function($scope, $element, $attributes) {
        
        $scope.newQuestionText = null;
        
      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_custom_question.html'
    }
  }]);

});