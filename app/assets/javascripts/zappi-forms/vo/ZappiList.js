define([], function () {

	function ZappiList(){
		this.items = [];
		this.canEdit = true;
	}

	ZappiList.prototype =  {

		constructor: function(){
			return ZappiList;
		},

		addItem: function( item ){
			this.items.push( item );
		},

		hasItem: function( item ){
			return this.items.indexOf( item )>=0;
		},

		removeItem: function( item ){
			this.items.splice( this.items.indexOf( item ),1 );
		},

		moveItemUp: function( item ){
			var __currentIndex = this.items.indexOf( item );

			if( __currentIndex>0 && this.canEdit ){          
				this.canEdit = false;
			  	this.items.splice( __currentIndex, 1 );
			  	this.items.splice( __currentIndex-1, 0, item );  
			    this.canEdit = true;
			}
		},

		moveItemDown: function( item ){
			var __currentIndex = this.items.indexOf( item )

			if( __currentIndex < this.items.length-1 && this.canEdit ){          
			  this.item.splice( __currentIndex, 1 );
			  this.canEdit = false;
			  this.item.splice( __currentIndex+1, 0, item );  
			  this.canEdit = true;
			}
		},

		asArray: function(){
			return this.items
		},

		getPosition: function( item ){
			return this.items.indexOf( item );
		},

		clone: function(){
			var __new = new ZappiList();

			for( var i=0; i<this.items.length; i++ ){
				__new.items[ i ] = this.items[i].clone();
			}
		}		
	}

	return ZappiList;

});