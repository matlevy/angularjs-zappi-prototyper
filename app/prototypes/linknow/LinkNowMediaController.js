define(['./module'], function (linkNow) {

	linkNow.controller('LinkNowMediaController', ['$scope', 'LinkNowOptionsModel', 'LinkNowChoicesModel', function( $scope, LinkNowOptionsModel, LinkNowChoicesModel ){
		
		$scope.options = LinkNowOptionsModel.getOptions();
		$scope.choices = LinkNowChoicesModel;
		$scope.mediaObject = null;

		console.log("LinkNowMediaController")

		$scope.setMediaObject = function(v){
			console.log(v);
			//$scope.mediaObject = v;
		}

		$scope.updateMediaOptions = function(v){
			console.log(v);
		}

		$scope.onRemove = function(){
			console.log("here");
		}
	}]);

});