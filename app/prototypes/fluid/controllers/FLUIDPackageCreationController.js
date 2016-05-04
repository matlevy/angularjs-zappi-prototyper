define(['../module'], function ( fluid_menu ) {

	fluid_menu.controller('FLUIDPackageCreationController', ['$rootScope', '$scope', '$interval', '$timeout', '$route', "$routeParams", "$animate", "$location", "FLUIDMenuService",
		function($rootScope, $scope, $interval, $timeout, $route, $routeParams, $animate, $location, fluidMenuService ){

			$scope.createNewPackage = function(){
				if($scope.activePackage.length==0){
					$scope.setState('save_current');
				};
			};

			$scope.setState = function( state ){
				$scope.state = state;
			}

		}]);
});