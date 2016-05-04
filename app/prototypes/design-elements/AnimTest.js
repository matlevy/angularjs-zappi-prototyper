define(['./module'], function ( module ) {

	module.directive( 'animTest', [ '$animate', function($animate) {

		return {
			restrict: 'A',
			link: function($scope, $element, $attrs) {

				//$animate.enabled(true, $element);

				$scope.the_list = []

				for( var i=1; i<10; i++ ){
					$scope.the_list.push( i )
				}

				$scope.next = 10

				$scope.addSomething = function(){
					$scope.the_list.push( $scope.next );
					$scope.next = $scope.next + 1;
				}

				$scope.removeSomething = function(){
					$scope.the_list.splice( $scope.the_list.length-1, 1 );
				}
			}
		};

	}]);

})