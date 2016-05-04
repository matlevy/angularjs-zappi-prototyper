define(['./module'], function (creative_test) {

	creative_test.factory('CreativeTestFormModel',["$http", function($http) {

		var model = {
			tutorial: {
				instructions: [],
			},
			pages: [],
			current_page: null
		}

		return model;
	}]);

});