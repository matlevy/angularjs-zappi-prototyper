define(['./module'], function (creative_test) {

	creative_test.controller('CreativeTestProtoTypeController', ['$rootScope', '$scope', 'CreativeTestOptionsModel', 'CreativeTestChoicesModel', 'CreativeTestFormModel', 'MediaObjectService', 'MediaUploaderService', '$routeParams', '$route',
		function($rootScope, $scope, CreativeTestOptionsModel, CreativeTestChoicesModel, CreativeTestFormModel, MediaObjectService, MediaUploaderService, $routeParams, $route ){

		$scope.currentSelectedCountry = { key: 'United Kingdom', value: 'UK' }
		$scope.currentCompletions = 100;
		$scope.currentTime = "3hrs";
		$scope.currentPrice = "£1000";

		$scope.problems = [];
		$scope.models = {}

		$scope.models.options = CreativeTestOptionsModel.getOptions();
		$scope.models.choices = CreativeTestChoicesModel;
		$scope.models.form = CreativeTestFormModel;
		$scope.mediaObjectService = MediaObjectService;

		$scope.models.form.pages = [];

		$scope.industrySearchText = "";

		$scope.edit = {};

		$scope.edit.setWhere = function(v){
			$scope.models.choices.where=v;
		}

		$scope.edit.setStage = function(v){
			$scope.models.choices.stage=v;
		}

		$scope.edit.setAffinity = function(v){
			$scope.models.choices.affinity=v;
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
			$scope.edit.setWhere( $scope.models.options.where[0] );
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