define(['../module'], function (heatmap_prototype_controller) {
	heatmap_prototype_controller.controller('HeatmapPrototypeController', ['$rootScope', '$scope', '$interval', '$timeout', '$route', "$routeParams", "$animate", "$location",
		function($rootScope, $scope, $interval, $timeout, $route, $routeParams, $animate, $location ){

			$animate.enabled( true );

			$scope.step = 1;
			$scope.pointers = [];
			$scope.currentPointer = null;

			$scope.gotoStep = function( step ){
				$scope.step = step;

				if( step == 2 ){
					$scope.comments = '';
				}
			}

			$scope.hideQuestion = function(){
				$scope.step = 1;
			}

			$scope.onImageClicked = function(){
				if( $scope.step>3 ) {
					$scope.gotoStep(5)
				} else {
					$scope.gotoStep(2);	
				} 
			}

			$scope.addMarker = function(){
				$scope.pointers.push({});
			}

			$scope.clearAll = function(){
				$scope.pointers = [];
				$scope.gotoStep(1);	
				$scope.comments = '';
				window.scrollTo(0,0);
				$scope.currentPointer = null;
			}

			$scope.resetChanges = function(){
				$scope.gotoStep(1);	
				$scope.comments = '';
				window.scrollTo(0,0);
				$scope.currentPointer = null;
			}

			$scope.selectItem = function( item ){
				$scope.currentPointer = item;
				$scope.gotoStep(3);	
				$scope.comments = 'blah blah blah';
				window.scrollTo(0,0);
			}

			$scope.removeCurrentItem = function(){
				$scope.pointers.splice( $scope.pointers.indexOf($scope.currentPointer), 1 );
				$scope.currentPointer = null;
				$scope.gotoStep(1);	
				$scope.comments = '';
			}

			$scope.updateOrStore = function(){
				if($scope.currentPointer==null){ $scope.gotoStep(1); $scope.comments=''; $scope.addMarker(); } 
					else { 
						$scope.currentPointer==null; $scope.comments=''; $scope.gotoStep(1) }
				$scope.currentPointer = null;
				window.scrollTo(0,0);
			}

			$scope.comments = '';
		}
	]);
});