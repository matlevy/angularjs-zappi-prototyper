define(['./module'], function (mmr) {

	mmr.factory('MMRChoicesModel',["$http", function($http) {

		var model = {
			media: [
				
			],
			category: null,
			expectations: [],
			elements: [],
			brand: "",
			pack_title: "",
			product_type: "",
			product_name: "",
			package_images: []
		}

		for( i=0; i< 20; i++ ){
			model.package_images.push( { key: "", value: ""} );
		}

		return model;
	}]);

});