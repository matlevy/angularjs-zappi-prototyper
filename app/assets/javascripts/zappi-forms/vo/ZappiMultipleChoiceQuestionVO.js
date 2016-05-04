define(['require','zappi-forms-js/vo/ZappiMultipleChoiceQuestionVO'], function ( require, valobj ) {

	var ZappiMultipleChoiceQuestionVO = function( question_text ){

		var _this = this;

		_this.type = "multiple-choice";
		_this.text = question_text;
		_this.answers = [];
		_this.is_multiple_choice = false;
		_this.randomise = false;
		_this.canEditAnswers = false;
		_this.hasExclusive = false;
		
		_this.addAnswer = function( answer ){
			_this.answers.push( answer );
		}

		_this.hasAnswer = function( answer ){
			return _this.answers.indexOf( answer )>=0 || answer==_this.exclusiveAnswer;
		}

		_this.removeAnswer = function( question ){
			_this.answers.splice( _this.answers.indexOf( question ),1 );
		}

		_this.moveAnswerUp = function( question ){
			var __currentIndex = _this.answers.indexOf( question )

			if( __currentIndex>0 && _this.canEditAnswers ){          
				_this.canEditAnswers = false;
			  	_this.answers.splice( __currentIndex, 1 );
			  	$timeout( function(){
			    	_this.answers.splice( __currentIndex-1, 0, question );  
			    	_this.canEditAnswers = true;
			  	}, 50 );
			}
		}

		_this.moveAnswerDown = function( question ){
			var __currentIndex = _this.answers.indexOf( question )

			if( __currentIndex < _this.answers.length-1 && _this.canEditAnswers ){          
			  _this.answers.splice( __currentIndex, 1 );
			  _this.canEditAnswers = false;
			  $timeout( function(){
			    _this.answers.splice( __currentIndex+1, 0, question );  
			    _this.canEditAnswers = true;
			  }, 50 );
			}
		}

		_this.getPosition = function(){
			return _this.answers.indexOf( _this ) + 1;
		}

		_this.clone = function(){
			var __new = new _this.construct( _this.type.toString() );
			__new.text = _this.text.toString();

			angular.forEach( _this.answers, function( answer ){
				__new.answers.push( answer.clone() );
			})

			__new.is_multiple_choice = _this.is_multiple_choice==true ? true : false;
			__new.randomise = _this.randomise==true ? true : false;
			__new.canEditAnswers = _this.canEditAnswers==true ? true : false;
			__new.exclusiveAnswer = _this.exclusiveAnswer.clone();
			__new.hasExclusive = _this.hasExclusive==true ? true : false;

			return __new;
		}

	}	

	ZappiMultipleChoiceQuestionVO.prototype.construct = ZappiMultipleChoiceQuestionVO;

	return ZappiMultipleChoiceQuestionVO;

});