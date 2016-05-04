define(['../module'], function ( fluid_container ) {

	fluid_container.controller('FLUIDContainerController', ['$rootScope', '$scope', '$interval', '$timeout', '$route', "$routeParams", "$animate", "$location",
		function($rootScope, $scope, $interval, $timeout, $route, $routeParams, $animate, $location ){

			$scope.view_mode = "tiled";
			$scope.selected = [];
			$scope.activePackage_temp = [];
			$scope.folder = null;

			$scope.$on( 'app.open_chart', function(e,chart){
				//if( $scope.activePackage.indexOf(chart)==-1 ){
					$scope.activePackage = $scope.activePackage.reverse();
					$scope.activePackage.push( {
						key:chart.key,
						value:chart.value,
						chart_path:chart.chart_path,
						is_selected:false
					} );
					$scope.activePackage = $scope.activePackage.reverse();
				//}
			});

			$scope.onWindowClick = function(item){
				$scope.resetSelected();
			}

			$scope.resetSelected = function(){
				while( $scope.selected.length > 0 ){
					var report = $scope.selected.pop();
					var current_index = $scope.activePackage.indexOf( report )
					$scope.activePackage[ current_index ].is_selected = false;
				}
			}

			$scope.renameFolder = function(){
				$scope.$emit( 'app.name_folder', $scope.folder );
				$scope.goUp();
			}

			$scope.isItemHidden = function( item ) {
				return ($scope.view_mode!="tiled" && item.type=="package");
			}

			$scope.toggleViewMode = function(){
				$scope.view_mode = $scope.view_mode=='tiled' ? 'vertical' : 'tiled';
			}

			$scope.onChartItemClicked = function( item ){
				if( item.type=="package" ) {
					$scope.activePackage_temp.push( $scope.activePackage );
					$scope.selected.splice( $scope.selected.indexOf( item ), 1 );
					item.is_selected = false;
					$scope.activePackage = item.children;
					$scope.folder = item;
				} 
			}

			$scope.onChartItemSelected = function( item ){
				if( item.type=="package" ) {
					if( item.is_selected ){
						$scope.selected.splice( $scope.selected.indexOf( item ), 1 );
						item.is_selected = false;
					} else {
						$scope.selected.push( item );
						item.is_selected = true;
					}
					$scope.folder = item;
				} else if( $scope.selected.indexOf( item )==-1 ){
					$scope.selected.push( item );
					item.is_selected = true;
					$scope.folder = null;
				} else {
					$scope.selected.splice( $scope.selected.indexOf( item ), 1 );
					item.is_selected = false;
					$scope.folder = null;
				}
			}

			$scope.goUp = function(){
				if( $scope.activePackage_temp.length > 0 ){
					$scope.activePackage = $scope.activePackage_temp.pop();
				}
			}

			$scope.trashSelected = function( item ){
				while( $scope.selected.length > 0 ){
					var report = $scope.selected.pop();
					var current_index = $scope.activePackage.indexOf( report )
					$scope.activePackage[ current_index ].is_selected = false;
					$scope.activePackage.splice( current_index, 1 );
					report.is_selected = false;
				}
			}

			$scope.packageSelectedCharts = function( item ){
				var _group = {
					"type" : "package",
					"key" : "package",
					"children" : [],
					"chart_path" : "/prototypes/fluid/img/zi_package.svg"
				}

				$scope.$emit( 'app.name_folder', _group );

				while( $scope.selected.length > 0 ){
					var _i = $scope.selected.pop();
					_i.is_selected = false;
					_group.children.push( _i );
					$scope.activePackage.splice( $scope.activePackage.indexOf( _i ), 1 );
				}

				$scope.activePackage.push( _group );
			}

			$scope.save = function(){
				if( $scope.activePackage_temp.length==0 ){
					$scope.$emit( 'app.save_items', $scope.activePackage );
				} else {
					$scope.$emit( 'app.save_items', $scope.activePackage_temp[0] ); 
				}
			}

		}
	]);
});