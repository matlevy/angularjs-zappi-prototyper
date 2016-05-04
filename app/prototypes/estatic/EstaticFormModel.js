define(['./module'], function (estatic) {

	estatic.factory('EstaticFormModel',["$http", function($http) {

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