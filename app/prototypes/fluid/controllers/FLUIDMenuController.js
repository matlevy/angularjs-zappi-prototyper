define(['../module'], function ( fluid_menu ) {

	fluid_menu.controller('FLUIDMenuController', ['$rootScope', '$scope', '$interval', '$timeout', '$route', "$routeParams", "$animate", "$location", "FLUIDMenuService",
		function($rootScope, $scope, $interval, $timeout, $route, $routeParams, $animate, $location, fluidMenuService ){
			
			$scope.menu = [{
				"key" : "Road Map",
				"name" : "roadmap",
				"children" : []
			}, {
				"key" : "My Saved Reports",
				"name" : "saved_reports",
				"children" : []
			}];
			
			fluidMenuService.getMenu().then( function(d){
				$scope.getRootMenuItem('roadmap').children = d.road_map;
			});

			$scope.$on( 'menu.add-item', function(e,menu_item){
				$scope.getRootMenuItem('saved_reports').children.push(menu_item);
			});

			$scope.$on( 'menu.go-home', function(e){
				$scope.goHome();
			});

			$scope.$on( 'menu.go-back', function(e){
				$scope.goBack();
			});

			$scope.getRootMenuItem = function(name){
				for( var _i=0; _i<$scope.menu.length; _i++ ){
					if( $scope.menu[_i].name == name )
						return $scope.menu[_i]
				}
				return null;
			}

			$scope.incrementMenu = function(){
				$scope.depth++;
			}

			$scope.selectMenuItem = function( menu ){

				if( menu.type == "package" ){
					$scope.$emit( 'menu.select_package', menu );
				} else {
					if( menu.children ){
						$scope.menus[$scope.depth-1] = menu.children;
						$scope.setDepth($scope.depth+1);
					} else {
						$scope.openChart( menu );
					}
				}

			}

			$scope.toggleStar = function( menu_item ){
				menu_item.stared = !menu_item.stared | false;

				if( $scope.stared.indexOf(menu_item) == -1 ){
					$scope.stared.push( menu_item );
				} else {
					$scope.stared.splice ( $scope.stared.indexOf( menu_item ), 1 );
				}

				if( $scope.stared.length == 0 && $scope.depth==0 ){
					$scope.goHome();
				}
			}

			$scope.goBack = function(){
				var d = $scope.history.pop();
				$scope.depth = d!=null ? d : 1;
			}

			$scope.goHome =  function(){
				$scope.setDepth(1);
			}

			$scope.goStared = function(){
				$scope.setDepth(0);
			}

			$scope.setDepth = function( depth ){
				$scope.history.push( $scope.depth );
				$scope.depth = depth;
			}

			$scope.openChart = function( chart ){
				$scope.$emit( 'menu.open_chart', chart );
			}

			$scope.stared = [];
			$scope.menus = [];
			$scope.depth = 1;
			$scope.history = [];
		}
	]);

});