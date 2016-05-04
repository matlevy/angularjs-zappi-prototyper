define(['./module'], function (mmr) {

	mmr.factory('MMRFormModel',["$http", function($http) {

		var model = {
			tutorial: {
				instructions: [],
			},
			categorySearch: "",
			currentSelectedPackImage: null,
			currentPackGallery: [],
			modalGalleryState: 'galleries'
		}

		return model;
	}]);

});