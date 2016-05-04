define(['./module'], function (controllers) {

	controllers.controller(
		'ZappiFormDesignerController', 
		['$rootScope', '$scope', 'DesignerComponentModelService', 
		function($rootScope, $scope, DesignerComponentModelService ){

			$scope.models = {};
			$scope.models.form = DesignerComponentModelService.createFormModel();

			var page1 = DesignerComponentModelService.addFormPage( $scope.models.form, "A", "Test", 0 );
			var page2 = DesignerComponentModelService.addFormPage( $scope.models.form, "B", "Test", 1 );
			var page3 = DesignerComponentModelService.addFormPage( $scope.models.form, "C", "Test", 2 );

			page1.addNewSection(0);
			page1.addNewSection(1);
			page1.addNewSection(2);

			page2.addNewSection(0);
			page2.addNewSection(1);

			page3.addNewSection(0);
			page3.addNewSection(1);

			$scope.models.form.gotoPage( page2 );
			$scope.models.form.gotoNextPage();
			$scope.models.form.gotoNextPage();
			$scope.models.form.gotoPreviousPage();

	}]);

});