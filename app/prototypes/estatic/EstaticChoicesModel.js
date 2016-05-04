define(['./module'], function (estatic) {

	estatic.factory('EstaticChoicesModel',["$http", function($http) {

		var model = {
			category: null,
			written_category: null,
			brand: "",
			stage: null,
			messages: [],
			ad_type: null,
			media: [],
			sentences: []
		}

		return model;
	}]);

});