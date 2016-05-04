define(['./module'], function (estatic) {

	estatic.controller('EstaticProtoTypeController', ['$rootScope', '$scope', 'EstaticOptionsModel', 'EstaticChoicesModel', 'EstaticFormModel', "MediaObjectService", "$route", "$routeParams",
		function($rootScope, $scope, EstaticOptionsModel, EstaticChoicesModel, EstaticFormModel, MediaObjectService, $route, $routeParams){

		$scope.currentSelectedCountry = { key: 'United Kingdom', value: 'UK' }
		$scope.currentCompletions = 100;
		$scope.currentTime = "3hrs";
		$scope.currentPrice = "£1000";

		$scope.problems = [];
		$scope.models = {}

		$scope.models.options = EstaticOptionsModel.getOptions();
		$scope.models.choices = EstaticChoicesModel;
		$scope.models.form = EstaticFormModel;

		$scope.industrySearchText = "";

		$scope.edit = {};

		$scope.edit.setStage = function(v){
			$scope.models.choices.stage=v;
		}

		$scope.edit.setCategory = function(v){
			$scope.models.choices.category=v;
		}

		$scope.edit.setAdType = function(v){
			$scope.models.choices.ad_type=v;
		}
		
		$scope.selectionComplete = function(){
			return true;
		}

		$scope.onNewMedia = function( media_object ){
			if( $scope.models.choices.media.length < 5 )
				$scope.models.choices.media.push( media_object );
		}

		$scope.onMediaRemove = function( media_object ){
			$scope.models.choices.media.splice( $scope.models.choices.media.indexOf(media_object), 1 );
		}

		$scope.blinkArea = function(){}

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

		$scope.skin = $routeParams.skin;

		$scope.setDefaults();

	}]);

});