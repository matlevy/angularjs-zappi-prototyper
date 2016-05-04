define(['./module'], function (linkNow) {

	linkNow.controller('LinkNowDigitalProtoTypeController', ['$rootScope', '$scope', 'LinkNowOptionsModel', 'LinkNowChoicesModel', 'LinkNowFormModel', '$interval', '$timeout', "MediaObjectService", '$route', '$routeParams',
		function($rootScope, $scope, LinkNowOptionsModel, LinkNowChoicesModel, LinkNowFormModel, $interval, $timeout, MediaObjectService, $route, $routeParams){

		$scope.currentSelectedCountry = { key: 'United Kingdom', value: 'UK' }
		$scope.currentCompletions = 100;
		$scope.currentTime = "3hrs";
		$scope.currentPrice = "£1000";

		$scope.problems = [];
		$scope.models = {};

		$scope.test = [
					{ key: "Draft", value: "draft" },
					{ key: "Finished", value: "finished" }
				]

		$scope.models.options = LinkNowOptionsModel.getOptions();
		$scope.models.choices = LinkNowChoicesModel;
		$scope.models.form = LinkNowFormModel;
		$scope.mediaObjectService = MediaObjectService;

		$scope.industrySearchText = "";

		$scope.edit = {};

		$scope.selectionComplete = function(){

			if( $scope.models.view.state == 'initial' ){
				$scope.models.view.state = 'media'
			} else {
				alert("The form now proceeds to the confirm page.")
			}
			return true;
		}

		$scope.gotoPreviousSection = function(){
			switch( $scope.models.view.state ){
				case "media":
					$scope.models.view.state = "initial";
					$scope.models.view.title = "Setup Your Survey";
					break;
				default: 
					$scope.models.view.state = "initial";
					$scope.models.view.title = "Upload your test media";
			}
		}

		$scope.edit.setStage = function(v){
			$scope.models.choices.stage=v;
		}

		$scope.edit.setCategory = function(v){
			$scope.models.choices.category=v;
		}

		$scope.createFileUploadObject = function(){
			return {}
		}

		$scope.onNewMedia = function( media_object ){

			if( $scope.models.choices.media.length < 5 )
				$scope.models.choices.media.push( media_object );

			media_object.meta.context = null;
			media_object.meta.full_context = null;
			media_object.stage = "";
			media_object.feature_types = [];
			media_object.advert_type = null;
			
			media_object.setAllowedContextsForMedia( $scope.getAllowedContextsForMedia( media_object ) );
		}

		$scope.updateMediaObjectMeta = function( media_object ){
			media_object.updateContext();
			media_object.setAllowedAdvertTypes( $scope.getAllowedAdvertPositionsForMedia( media_object ) );
			media_object.setAllowedFeatureTypes( $scope.getAllowedAdvertAdvertFeaturesForMedia( media_object ) );
		}

		$scope.onMediaRemove = function( media_object ){
			$scope.models.choices.media.splice( $scope.models.choices.media.indexOf(media_object), 1 );
		}

		$scope.onFileUploaded = function( media_object ){
			$scope.setAllowedContextsForUpload( media_object );
		}

		$scope.getAllowedContextsForMedia = function( media_object ){

			var __return = [];

			angular.forEach( $scope.models.options.media_position_types, function(v){
				if( v.permitted_upload_type.indexOf( media_object.meta.media_type )>=0 )
					__return.push(v)
			});
			
			return __return;

		}

		$scope.getAllowedAdvertPositionsForMedia = function( media_object ){

			var __return = [];

			if( media_object.meta.full_context ){
				angular.forEach( $scope.models.options.advert_types, function(v){
					if( v.permitted_context.indexOf( media_object.meta.full_context )>=0 )
						__return.push(v)
				});
			}

			return __return;
		}

		$scope.getAllowedAdvertAdvertFeaturesForMedia = function( media_object ){

			var __return = [];

			if( media_object.meta.full_context ){
				angular.forEach( $scope.models.options.advert_features, function(v){
					if( v.permitted_context.indexOf( media_object.meta.full_context )>=0 )
						__return.push(v)
				});
			}

			return __return;
		}

		$scope.setDefaults = function(){
			$scope.edit.setStage( $scope.models.options.stages[0] );
		}

		$scope.setDefaults();

		$rootScope.$on( "zappi.forms.complete", function(){
			$route.updateParams({
              page: 0,
              prototype_name: 'confirmation',
              skin: $routeParams.skin,
              headerImage: 'launch'
            })
		});

	}]);

});