define(['./module'], function () {

	var ZappiMultipleChoiceAnswerVO = function( answer_text ){

		var _this = this;

		_this.key = answer_text;
		_this.isFixed = false;

		_this.toggleFixed = function( question_is_randomised ){
			this.isFixed = question_is_randomised ? !_this.isFixed : false;
		}

		_this.clone = function(){
			var __new = new _this.construct( _this.key.toString() )
			__new.isFixed = _this.isFixed==true ? true : false;
			return __new;
		}

	}

	ZappiMultipleChoiceAnswerVO.prototype.construct = ZappiMultipleChoiceAnswerVO;

	return ZappiMultipleChoiceAnswerVO;

});