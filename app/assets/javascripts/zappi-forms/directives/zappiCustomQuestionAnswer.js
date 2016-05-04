define(['./module'], function (directives) {

  directives.directive("zappiCustomQuestionAnswer", ["$timeout", "$interval", "ZappiQuestionService", function($timeout,$interval,ZappiQuestionService){
    return {
      restrict: 'E',
      scope: {
        question: '=',
        answer: "=?",
        placeholder: "@"
      },
      controller: function( $scope, $element ) {

        if( $scope.answer == null )
          $scope.answer = ZappiQuestionService.createAnswer( "multiple-choice-answer", "" )

        $($element).find('.answer-input').on('keyup', function(e){
          if(e.which==13||e.keyCode==13){
            $timeout( function(){
              $scope.addCustomMultiChoiceAnswer();  
            }, 50 );
          }
        })

        $scope.addCustomMultiChoiceAnswer = function(){
          if( !$scope.question.hasAnswer( $scope.answer ) ){
            $scope.question.addAnswer( $scope.answer );
            $scope.answer = ZappiQuestionService.createAnswer( "multiple-choice-answer", "" );
          }
          console.log($scope.question);
        }

        $scope.getPlaceHolderText = function(){
          return placeholder != null ? placeholder : "type an answer for your question and press \'enter\'";
        }

      },
      link: function($scope, $element, $attributes) {
        
        $scope.newQuestionText = null;
        
      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_custom_question_answer.html'
    }
  }]);

});