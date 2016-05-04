define(['./module'], function (linkNow) {

	linkNow.factory('LinkNowChoicesModel',["$http", function($http) {

		var model = {
			category: null,
			written_category: null,
			brand: "",
			stage: null,
			messages: [],
			media: [
				
			],
			sentences: [],
			questions: []
		}

		return model;
	}]);

});