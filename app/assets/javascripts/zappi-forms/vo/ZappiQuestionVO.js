define(['./module'], function () {

	var ZappiQuestionVO = function( question_text ){

		var _this = this;

		_this.type = "question";
		_this.text = question_text;

	}

	return ZappiQuestionVO

});