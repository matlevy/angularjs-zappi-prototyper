define([

	'zappi-forms-js/vo/ZappiSectionVO',
	'zappi-forms-js/vo/ZappiList'

	], function( ZappiSectionVO, ZappiList ){
	
	function ZappiPageVO(id,title,index){

		this._sections = new ZappiList();
		this.id = id;
		this.title = title;
		this.index = index;
		this.sections = this._sections.asArray();
		this.valid = false;
		this.complete = false;
		this.started = false;
	}

	ZappiPageVO.prototype = {

		constructor: function(){
			return ZappiPageVO;
		},

		addNewSection: function(index){
			this.sections[index] = new ZappiSectionVO();
			return this.sections[index];
		},

		moveSectionDown: function( section ){
			this._sections.removeItem( section );
			return section;
		},

		moveSectionUp: function( section ){
			this._sections.removeItem( section );
			return section;
		},

		removeSection: function( section ){
			this._sections.removeItem( section );
			return section;
		},

		asObject: function(){

			var __r = {};
			__r.id = this.id;
			__r.title = this.title;
			__r.index = this.index;
			__r.sections = [];

			for( var si=0; si<this._sections.asArray().length; si++){
				__r.sections[ si ] = this._sections.asArray()[ si ].asObject();
			}

			return __r;
		}
	}

	return ZappiPageVO;
});