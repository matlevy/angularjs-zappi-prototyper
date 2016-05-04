zappistoreApp.controller('ConfigurationTutorialController', ['$rootScope', '$scope', '$sce', '$timeout', '$interval', function($rootScope, $scope, $sce, $timeout, $interval){
	
	$scope.m = {};

	$scope.m.tutorialStarted = false;
	$scope.m.showTutorial = true;
	$scope.m.guideStarted = false;

	$scope.m.tips = [
		{ 
			title: "Start with the basics", targetClass: "main-section", copy: "After setting your target country, choose whether to create a custom target audience.", 
			nextText: "OK, Got It", previousText: "Go back a step", preBroadCast: ['configuration.demoCustomOptions','configuration.selectDemoOptions'], postBroadCast: [],
			options: { tipLocation: 'bottom' } },
		{ 
			title: "Choose your options", targetClass: "target-custom", copy: "If you chose custom, choose the options you would like to include. These will be highlighted blue.", 
			nextText: "OK, Got It", previousText: "Go back a step", preBroadCast: [], postBroadCast: [],
			options: { tipLocation: 'top' } },
		{ 
			title: "How do I know if there is a problem?", targetClass: "zappi-problem-list", copy: "If we can't calculate your price, a list of questions to check will appear here.", 
			nextText: "OK, Got It", previousText: "Go back a step", preBroadCast: [], postBroadCast: ['configuration.completeDemoOptions'],
			options: { tipLocation: 'left' } },
		{ 
			title: "Set your completions", targetClass: "completions-and-executions", copy: "You can increase the number of completions required by participents and, where applicable, the number of times you would like to perform your survey.", 
			nextText: "OK, Got It", previousText: "Go back a step", preBroadCast: ['configuration.showCompletions'], postBroadCast: [],
			options: { tipLocation: 'top'  } },
		{ 
			title: "Confirm your choices", targetClass: "audience-summary-panel", copy: "A summary of all your choices will appear here. You can change an option quickly by clicking the blue text.", 
			nextText: "OK, Got It", previousText: "Go back a step", preBroadCast: ['configuration.completeDemoOptions'], postBroadCast: [],
			options: { tipLocation: 'left' } },
		{ 
			title: "Check & Confirm", targetClass: "config-quote-box", copy: "A cost calculation and estimated length of completion will appear here. You can move to the next step by clicking the 'continue' button.", 
			nextText: "OK, Got It. Let Me Start", previousText: "Go back a step", preBroadCast: [], postBroadCast: [],
			options: { tipLocation: 'left' } },
	]

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
		$rootScope.$broadcast('configuration.exitDemo');
	}

	$scope.endTutorial = function(){
		$scope.m.showTutorial = false;
		$rootScope.$broadcast('configuration.reset');
		$rootScope.$broadcast('configuration.exitDemo');
	}

	$scope.startGuide = function(){
		$scope.m.showTutorial = false;
		$timeout( function(){
			$scope.m.guideStarted = true;
		}, 1000 );
		$rootScope.$broadcast('configuration.setToDemoMode');
	}

	$scope.onPreStep = function(index){
		$rootScope.$broadcast('tutorial.configuration.prestep', index );

		if($scope.m.tips[index].preBroadCast){
			angular.forEach( $scope.m.tips[index].preBroadCast, function(v){
				$rootScope.$broadcast( v, index );
			});
		}

		$('body,html').trigger('scroll');
	}

	$scope.onPostStep = function(index){
		$rootScope.$broadcast('tutorial.configuration.poststep', index );

		$(window).scrollTop(0);

		if($scope.m.tips[index].postBroadCast){
			angular.forEach( $scope.m.tips[index].preBroadCast, function(v){
				$rootScope.$broadcast( v, index );
			});
		}

		$(window).trigger('scroll');
	}

	$scope.onTutorialComplete = function(){
		$rootScope.$broadcast('configuration.reset');
		$rootScope.$broadcast('configuration.exitDemo');
	}
}]);