define(['./module', 'zappi-forms-js/vo/module'], function (services, vo) {

	services.factory('ZappiQuestionService',["$http","$interval", function($http, $interval) {

		var $ZappiQuestionService = {};

		$ZappiQuestionService.factory = {};

		$ZappiQuestionService.createQuestion = function( type, question_text ){

			switch(type) {
				case "multiple-choice":
					var __question = new vo.multipleChoiceQuestion(question_text);
					__question.exclusiveAnswer = $ZappiQuestionService.createAnswer( "multiple-choice-answer", "" );
					return __question;
				default:
					return new vo.question( media_object );
			}
			return null;
		}

		$ZappiQuestionService.createAnswer = function( type, answer_text ){
			switch(type) {
				case "multiple-choice-answer":
					return new vo.multiChoiceAnswer( answer_text );
				default:
					return new vo.answer( answer_text );
			}
			return null;
		}

		return $ZappiQuestionService;

	}]);

});