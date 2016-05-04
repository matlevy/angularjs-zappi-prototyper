define(['./module'], function (custom_question) {

	custom_question.controller('LinkNowCustomQuestionProtoTypeController', ['$rootScope', '$scope', 'LinkNowOptionsModel', 'LinkNowChoicesModel', 'LinkNowFormModel', '$interval', '$timeout', "$route", "$routeParams",
		function($rootScope, $scope, LinkNowOptionsModel, LinkNowChoicesModel, LinkNowFormModel, $interval, $timeout, $route, $routeParams){

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

		$scope.industrySearchText = "";

		$scope.edit = {};

		$scope.edit.setStage = function(v){
			$scope.models.choices.stage=v;
		}

		$scope.edit.setCategory = function(v){
			$scope.models.choices.category=v;
		}
		
		$scope.selectionComplete = function(){
			return true;
		}

		$scope.createFileUploadObject = function(){
			return {}
		}

		$scope.addQuestion = function( question_object ){

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