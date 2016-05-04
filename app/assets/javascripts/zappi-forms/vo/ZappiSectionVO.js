define([
	
	], function(){
	
	function ZappiSectionVO(){
		this.questions = [];
	}

	ZappiSectionVO.prototype = {

		constructor: function(){
			return ZappiSectionVO;
		},

		asObject: function(){

			var __r = {};

			for( var qi=0; qi<this.questions.length; qi++){
				__r.questions[ qi ] = this.questions[ qi ].asObject();
			}

			return __r;
		}
		
	}

	return ZappiSectionVO;
});