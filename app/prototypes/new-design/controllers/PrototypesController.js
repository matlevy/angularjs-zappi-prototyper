define(['../module'], function ( module ) {

	module.controller('PrototypesController', ['$rootScope', '$scope', '$interval', '$timeout', '$route', "$routeParams", "$animate", "ProtoTypeIndexService",

		function($rootScope, $scope, $interval, $timeout, $route, $routeParams, $animate, protoTypeIndexService ){

			$scope.prototypes = {};
			
			$scope.prototypeFilter = function( value, index, array ){
				
				if( $scope.prototypes.search_text=="" &&  $scope.prototypes.selected_tag == null && $scope.prototypes.selected_stage == null ){

					return true;

				} else {

					if( $scope.prototypes.selected_tag != null && $scope.prototypes.selected_stage != null && $scope.prototypes.search_text == "" ){

						if( value.tags.indexOf( $scope.prototypes.selected_tag ) > -1 && value.stage == $scope.prototypes.selected_stage )
							return true;

						return false;

					} else if( $scope.prototypes.selected_tag != null && $scope.prototypes.selected_stage != null && $scope.prototypes.search_text != "" ) {

						if( ( value.stage == $scope.prototypes.selected_stage ) && ( value.name.toLowerCase().indexOf( $scope.prototypes.search_text.toLowerCase() ) > -1 || value.description.toLowerCase().indexOf( $scope.prototypes.search_text.toLowerCase() ) > -1 ) && value.tags.indexOf( $scope.prototypes.selected_tag ) > -1 )
							return true;

						return false;


					} else if( $scope.prototypes.selected_tag != null && $scope.prototypes.search_text != "" ) {

						if( ( value.name.indexOf( $scope.prototypes.search_text ) > -1 || (value.description.toLowerCase().indexOf( $scope.prototypes.search_text.toLowerCase() ) > -1 ) ) && value.tags.indexOf( $scope.prototypes.selected_tag ) > -1 )
							return true;

						return false;

					} else if( $scope.prototypes.selected_stage != null && $scope.prototypes.search_text != "" ) {

						if( value.stage == $scope.prototypes.selected_stage && ( value.name.toLowerCase().indexOf( $scope.prototypes.search_text.toLowerCase() ) > -1 || value.description.toLowerCase().indexOf( $scope.prototypes.search_text.toLowerCase() ) > -1 ) )
							return true;

						return false;


					} else {

						if( value.name.toLowerCase().indexOf( $scope.prototypes.search_text.toLowerCase() ) > -1 && $scope.prototypes.search_text !="" )
							return true;

						if( value.description.toLowerCase().indexOf( $scope.prototypes.search_text.toLowerCase() ) > -1 && $scope.prototypes.search_text !="" )
							return true;

						if( value.tags.indexOf( $scope.prototypes.selected_tag ) > -1 )
							return true;

						if( value.stage == $scope.prototypes.selected_stage )
							return true;

					}

					return false;

				}

				return false;

			}

			$scope.clearData = function(){
				$scope.prototypes = {
					data: [],
					tags: [],
					selected_tag: null,
					stages: [],
					selected_stage: null,
					search_text: "",
				};

			}

			$scope.getZappiPrototypeData = function(){
				protoTypeIndexService.async().then( function(d){

					$scope.clearData();

					$scope.prototypes.data = d.prototypes;

					angular.forEach( $scope.prototypes.data, function(v,i){
						
						if( $scope.prototypes.stages.indexOf( v.stage )==-1 )
							$scope.prototypes.stages.push( v.stage );

						angular.forEach( v.tags, function(v,i){
							if( $scope.prototypes.tags.indexOf( v )==-1 )
								$scope.prototypes.tags.push( v );	
						});

					});
					
				});
			}

			$scope.clearPrototypeStageFilter = function(){
				$scope.prototypes.selected_stage = null;
			}

			$scope.clearPrototypeTagFilter = function(){
				$scope.prototypes.selected_tag = null;
			}

			$scope.getZappiPrototypeData();

		}]);

});
