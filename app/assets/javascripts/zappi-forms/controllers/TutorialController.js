define(['./module'], function (controllers) {

	controllers.controller('TutorialController', ['$rootScope', '$scope', '$sce', '$timeout', '$interval', function($rootScope, $scope, $sce, $timeout, $interval){
	
		$scope.m = {};

		$scope.m.tutorialStarted = false;
		$scope.m.showTutorial = true;
		$scope.m.guideStarted = false;

		$scope.getOptions = function(tip){
			var permittedOptions = ['tipLocation','nubPosition'];
			var options = [];

			for( var i=0; i<permittedOptions.length; i++){
				if( tip.options && tip.options[ permittedOptions[i] ]!=null ){
					options.push( permittedOptions[i] + ":" + tip.options[ permittedOptions[i] ] + "");
				}
			}

			return options.join(',');
		}

		$scope.startTutorial = function(){
			$scope.m.tutorialStarted = true;
		}

		$scope.hideTutorial = function(neverShow){
			$scope.m.showTutorial = false;
			$rootScope.$broadcast('creativetest.exitDemo');
		}

		$scope.endTutorial = function(){
			$scope.m.showTutorial = false;
			$rootScope.$broadcast('creativetest.reset');
			$rootScope.$broadcast('creativetest.exitDemo');
		}

		$scope.startGuide = function(){
			$scope.m.showTutorial = false;
			$timeout( function(){
				$scope.m.guideStarted = true;
			}, 1000 );
			$rootScope.$broadcast('creativetest.setToDemoMode');
		}

		$scope.onPreStep = function(index){
			$rootScope.$broadcast('tutorial.creativetest.prestep', index );

			if($scope.m.tips[index].preBroadCast){
				angular.forEach( $scope.m.tips[index].preBroadCast, function(v){
					$rootScope.$broadcast( v, index );
				});
			}

			$('body,html').trigger('scroll');
		}

		$scope.onPostStep = function(index){
			$rootScope.$broadcast('tutorial.creativetest.poststep', index );

			$(window).scrollTop(0);

			if($scope.m.tips[index].postBroadCast){
				angular.forEach( $scope.m.tips[index].preBroadCast, function(v){
					$rootScope.$broadcast( v, index );
				});
			}

			$(window).trigger('scroll');
		}

		$scope.onTutorialComplete = function(){
			$rootScope.$broadcast('creativetest.reset');
			$rootScope.$broadcast('creativetest.exitDemo');
		}
	}]);

});