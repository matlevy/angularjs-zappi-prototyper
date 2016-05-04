define([], function () {

	function ZappiPaginator( items ){
		this._items = items;
		this._currentIndex = 0;
	}

	ZappiPaginator.prototype =  {

		getCurrent: function(){
			return this._items[ this._currentIndex ];
		},

		moveNext: function(){
			if( this._currentIndex < this._items.length-1 )
				this._currentIndex++;
		},

		movePrevious: function(){
			if( this._currentIndex > 0 )
				this._currentIndex++;
		},

		moveToFirst: function(){
			this._currentIndex = 0;
		},

		moveToLast: function(){
			this._currentIndex = this._items.length-1;
		},

		moveTo: function(index){
			if( index < this._items.length && index >= 0 ){
				this._currentIndex = index;
			} else {
				throw "Out of index range";
			}
		}


	}

	return ZappiPaginator;

});