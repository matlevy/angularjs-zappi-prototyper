define(['./module'], function (linkNow) {

	linkNow.controller('LinkNowProtoTypeController', ['$rootScope', '$scope', 'LinkNowOptionsModel', 'LinkNowChoicesModel', 'LinkNowFormModel', '$interval', '$timeout', "MediaObjectService", "$route", "$routeParams",
		function($rootScope, $scope, LinkNowOptionsModel, LinkNowChoicesModel, LinkNowFormModel, $interval, $timeout, MediaObjectService, $route, $routeParams){

		$scope.currentSelectedCountry = { key: 'United Kingdom', value: 'UK' }
		$scope.currentCompletions = 100;
		$scope.currentTime = "3hrs";
		$scope.currentPrice = "£1000";

		$scope.problems = [];
		$scope.models = {};

		$scope.models.options = LinkNowOptionsModel.getOptions();
		$scope.models.choices = LinkNowChoicesModel;
		$scope.models.form = LinkNowFormModel;
		$scope.mediaObjectService = MediaObjectService;

		$scope.industrySearchText = "";

		$scope.edit = {};

		$scope.edit.setStage = function(v){
			$scope.models.choices.stage=v;
		}

		$scope.edit.setCategory = function(v){
			$scope.models.choices.category=v;
		}
		
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

		$scope.onNewMedia = function( media_object ){
			if( $scope.models.choices.media.length < 5 )
				$scope.models.choices.media.push( media_object );
		}

		$scope.onMediaRemove = function( media_object ){
			$scope.models.choices.media.splice( $scope.models.choices.media.indexOf(media_object), 1 );
		}

		$scope.onFileUploaded = function( media_object ){
			$scope.setAllowedContextsForUpload( media_object );
		}

		$scope.setDefaults = function(){
			$scope.edit.setStage( $scope.models.options.stages[0] );
		}

		$rootScope.$on( "zappi.forms.complete", function(){
			$route.updateParams({
              page: 0,
              prototype_name: 'confirmation',
              skin: $routeParams.skin,
              headerImage: 'launch'
            })
		});

		$scope.setDefaults();

	}]);

});