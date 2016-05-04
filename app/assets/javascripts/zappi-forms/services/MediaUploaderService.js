define(['./module'], function (services) {

	services.factory('MediaUploaderService',["$http","$interval", function($http, $interval) {

		var $mediaUploaderService = {};

		$mediaUploaderService.factory = {};

		var SimulatedUploader = function(media_object){

			var _this = this;

			_this._media_object = media_object;
			_this._interval = null;

			_this.upload = function(){

				_this._media_object.state = "uploading";

				if( _this._interval )
					$interval.cancel( _this._interval )

				_this._interval = $interval( function(){
					
					_this._media_object.uploadProgress += 1;
					
					if( _this._media_object.uploadProgress >= 100 ){
						
						$interval.cancel( _this._interval )
						
						_this._media_object.state = "uploaded";

						if(_this._media_object.meta.type == "image"){
							_this._media_object.thumbnail = "/assets/zappistore.png"
						} else if(_this._media_object.meta.type == "video"){
							_this._media_object.video = "https://player.vimeo.com/external/118265681.hd.mp4?s=9d47e5dd0d043b63945099bdf55b88af"
						}

						if( _this.onComplete )
							_this.onComplete();
					}

				}, 20 );
			}

		}

		$mediaUploaderService.factory.createUploader = function( media_object, type ){
			switch(type) {
				case "sim":
					return new SimulatedUploader( media_object )
				default:
					return new SimulatedUploader( media_object )
			}
			return null;
		}

		return $mediaUploaderService;

	}]);

});