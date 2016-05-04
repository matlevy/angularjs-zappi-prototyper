define([
	
	'zappi-forms-js/vo/ZappiPageVO',
	'zappi-forms-js/vo/ZappiList',
	'zappi-forms-js/vo/ZappiPaginator'

	], function( ZappiPageVO, ZappiList, ZappiPaginator ){
	
	function ZappiFormVO(){
		this._pages = new ZappiList();
		this.pages = this._pages.asArray();

		this._paginator = new ZappiPaginator( this.pages );
		this.current_page = this._paginator.getCurrent();
	}

	ZappiFormVO.prototype = {

		constructor: function(){
			return ZappiFormVO;
		},

		gotoNextPage: function(){
			this._paginator.moveNext();
			this.current_page = this._paginator.getCurrent();
		},

		gotoPreviousPage: function(){
			this._paginator.movePrevious();
			this.current_page = this._paginator.getCurrent();
		},

		gotoPage: function( page ){
			this._paginator.moveTo( this.pages.indexOf( page ) );
			this.current_page = this._paginator.getCurrent();
			this.current_page.started = true;
		},

		addNewPage: function(id,title,index) {

			var __page = new ZappiPageVO( id, title, index );

			this._pages.addItem( __page );

			if(this.current_page==null)
				this.current_page = __page;

			return __page;
		},

		removePage: function( page ){
			this._pages.removeItem( page );
			return page;
		},

		movePageForward: function( page ){
			this._page.moveItemDown( page );
			return page;
		},

		movePageBackward: function( page ){
			this._page.moveItemUp( page );
			return page;
		},

		asObject: function(){

			var __r  = {};

			__r.pages = [];
			__r.current_page = this.current_page.asObject();

			for( var pi=0; pi<this._pages.asArray().length; pi++){
				__r.pages[ pi ] = this._pages.asArray()[ pi ].asObject();
			}

			return __r;

		}
		
	}

	return ZappiFormVO;
});