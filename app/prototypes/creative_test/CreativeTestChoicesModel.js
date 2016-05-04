define(['./module'], function (creative_test) {

	creative_test.factory('CreativeTestChoicesModel',["$http", function($http) {

		var model = {
			stage: null,
			where: null,
			industry: null,
			words: [],
			affinity: null,
			media: []
		}

		return model;
	}]);

});