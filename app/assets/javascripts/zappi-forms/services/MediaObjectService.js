define(['./module'], function (services) {

  services.factory('MediaObjectService',["$http", function($http) {

  	var $mediaObjectService = {};

  	$mediaObjectService.states = {};
  	$mediaObjectService.states.READY = "ready";
    $mediaObjectService.states.SELECTED = "selected";
    $mediaObjectService.states.UPLOADING = "uploading";
    $mediaObjectService.states.UPLOADED = "uploaded";

    $mediaObjectService.factory = {};

  	$mediaObjectService.factory.createMediaObject = function( type, file ){
  		switch(type){
  			case "linknow":
  				return new LinkNowMediaObject(file,$mediaObjectService.states.READY);
        case "linknowtv":
          var __media = new LinkNowMediaObject(file,$mediaObjectService.states.READY);
          __media.canSave == false;
          return __media;
        case "mmr":
          return new MMRMediaObject(file,$mediaObjectService.states.READY);
        case "youtube":
          return new GenericMediaObject(file,$mediaObjectService.states.READY);
  			default:
  				return new GenericMediaObject(file,$mediaObjectService.states.READY);
  		}
      }

      $mediaObjectService.setFileUploadMeta = function( media_object, file ){
  	    media_object.meta.file = file;
  	    media_object.meta.type = $mediaObjectService.getFileType( file );
  	    media_object.meta.media_type = $mediaObjectService.getMediaObjectMediaType( media_object );
  	}

  	$mediaObjectService.getFileType = function( file ){
  		if( file.type.indexOf('image') == 0 )
  		  return "image";
  		if( file.type.indexOf('video') == 0 )
  		  return "video";
  		return "unknown";
  	}

  	$mediaObjectService.getMediaObjectMediaType = function( media_object ){
  		if( media_object.meta.type == "video" )
  		  return "video"
  		return "display"
  	}

  	return $mediaObjectService;
  }]);

  var LinkNowMediaObject = function(file,state){
    
    var _this = this;

    this.state = state;
    this.uploadProgress = 0;
    this.canSave = true;

    this.meta = {
      file: file,
      type: "",
      media_type: "",
      context: null,
      permitted_media_contexts: [],
      permitted_advert_types: [],
      permitted_feature_types: [],
      selected_advert_type: null,
      selected_features: [],
    }

    this.updateContext = function(){
    	if( _this.meta.context ){
    		_this.meta.full_context = _this.meta.media_type + "." + _this.meta.context.value;
    	} else {
    		_this.meta.full_context = _this.meta.media_type;
    	}
    }

    this.setAllowedContextsForMedia = function( values ){
    	_this.meta.permitted_media_contexts.splice( 0, _this.meta.permitted_media_contexts.length );
    	angular.forEach( values, function(v){
    		_this.meta.permitted_media_contexts.push(v);
    	});
    };

    this.setAllowedAdvertTypes = function( values ){
    	_this.meta.permitted_advert_types.splice( 0, _this.meta.permitted_advert_types.length );
    	angular.forEach( values, function(v){
    		_this.meta.permitted_advert_types.push(v);
    	});
    };

    this.setAllowedFeatureTypes = function( values ){
    	_this.meta.permitted_feature_types.splice( 0, _this.meta.permitted_feature_types.length );
    	angular.forEach( values, function(v){
    		_this.meta.permitted_feature_types.push(v);
    	});
    };

    this.getFeatureTypesAsString = function(){
      if( _this.meta && _this.meta.feature_types ){
        return _this.meta.feature_types.map( function(value){
          return value.key;
        }).join(", ");
      }
      return ""
    }

  }

  var MMRMediaObject = function(file,state){

    var _this = this;

    this.state = state;
    this.uploadProgress = 0;
    this.canSave = false;
    
    this.meta = {
      file: file,
      uploader: null,
      type: "",
      pack_title: "",
      product_name: "",
      product_type: "",
      product_title: "",
      brand: "",
      benchmark: false
    }

  }

  var GenericMediaObject = function(file,state){

  	var _this = this;

  	this.state = state;
  	this.uploadProgress = 0;
    this.canSave = false;
    
  	this.meta = {
  		file: file,
  		uploader: null,
  		type: ""
  	}

  }

});