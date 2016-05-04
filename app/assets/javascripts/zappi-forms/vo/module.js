define([

	'./ZappiAnswerVO',
    './ZappiFormSectionVO',
    './ZappiFormVO',
    './ZappiMultipleChoiceAnswerVO',
    './ZappiMultipleChoiceQuestionVO',
    './ZappiQuestionVO',
    './ZappiPageVO'

	], function (

		answer,
		section,
		form,
		multiChoiceAnswer,
		multipleChoiceQuestion,
		question,
        page

	) {

    'use strict';

    return {

    	answer: answer,
    	section: section,
    	form: form,
    	multiChoiceAnswer: multiChoiceAnswer,
    	multipleChoiceQuestion: multipleChoiceQuestion,
    	question: question,
        page: page,

    }
});