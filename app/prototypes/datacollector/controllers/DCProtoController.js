define(['../module'], function (custom_question) {

	custom_question.controller('DCProtoController', ['$rootScope', '$scope', '$interval', '$timeout', '$route', "$routeParams", "$animate", "$location", "ProtoTypePathsService",
		function($rootScope, $scope, $interval, $timeout, $route, $routeParams, $animate, $location, protoTypePathsService){

			$animate.enabled(true);

			$scope.problems = [];
			$scope.models = {};
			$scope.page = {};
			
			// Simple model for the page header when demoing

			$scope.page.title = "Configure Your Survey";
			$scope.page.page_title = "sdfsd";
			$scope.page.domain = $routeParams.domain ? $routeParams.domain : "zappi";
			$scope.page.product = $routeParams.product;
			$scope.page.image = $routeParams.image ? $routeParams.image : ( $routeParams.domain ? "" : "product" );

			$scope.path = [];
			$scope.pathIndex = $routeParams.index ? $routeParams.index : 0;

			console.log($routeParams.path);

			protoTypePathsService.getPaths( $routeParams.path ).then( function(d){
				$scope.path = d;
				$scope.page.completed = ( ( ( $scope.pathIndex + 1 ) / ($scope.path.length+1) ) * 100 ).toString().concat('%');
			});
			
			//

			$scope.models.form = {};
			$scope.models.form.current_page = null;
			$scope.models.form.pages = [];

			///

			$scope.route = $routeParams;

			$scope.gotoNextPage = function(){
				if( $scope.path[ $scope.pathIndex ] ){
					$routeParams.prototype_name = $scope.path[ $scope.pathIndex ].next;
					$routeParams.header = $scope.path[ $scope.pathIndex ].header ? $scope.path[ $scope.pathIndex ].header : '';
					$scope.pathIndex += 1;
					$location.path( [ '/datacollector/', $routeParams.prototype_name, '/', $scope.page.domain, '/', $scope.page.product ].join('') )
						.search( { path: $routeParams.path, index: $scope.pathIndex, header: $routeParams.header } );
					$scope.showQuestion = true;
				}
			}

			$scope.hideQuestion = function(){
				//$scope.showQuestion = false;
			}
		}
	]);

});