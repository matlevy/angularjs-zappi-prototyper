define(['./module'], function (linkNow) {

	linkNow.factory('LinkNowFormModel',["$http", function($http) {

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