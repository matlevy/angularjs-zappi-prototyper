define(['../module'], function ( fluid_frame ) {

	fluid_frame.controller('FLUIDFrameController', ['$rootScope', '$scope', '$interval', '$timeout', '$route', "$routeParams", "$animate", "$location",
		function($rootScope, $scope, $interval, $timeout, $route, $routeParams, $animate, $location ){

			$scope.displayModal = false;
			$scope.modal_form_model = {};
			$scope.packages = [];
			$scope.active_package = [];
			
			$scope.forms = {

				save_collection_form: {
	    			form: '/prototypes/fluid/html-partials/forms/save_chart_collection.html',
	    			form_action: 'collection.save',
	    			name: '',
	    		},

	    		create_folder_form: {
	    			form: '/prototypes/fluid/html-partials/forms/create_folder_form.html',
	    			form_action: 'folder.name',
	    			name: '',
	    		}

	    	}

			$scope.$on( 'menu.open_chart', function(e,chart){
				$scope.$broadcast( 'app.open_chart', chart );
			});

			$scope.$on( 'menu.select_package', function(e,package){
				$scope.packages.push( package )
			});

			$scope.$on( 'app.save_items', function(e,collection){

				$scope.forms.save_collection_form.collection = collection;
				
				if( $scope.displayModal ){
					$scope.hideModal();
				} else {
					$scope.showModal( $scope.forms.save_collection_form );
				}

			} );

			$scope.$on( 'app.name_folder', function(e,folder){
				$scope.forms.create_folder_form.folder = folder;
				$scope.forms.create_folder_form.key = '';
				$scope.showModal( $scope.forms.create_folder_form );
			});

			$scope.$on( 'app.close_modal', function(e){
				$scope.hideModal();
			});

			$scope.$on( 'app.submit_modal_form', function(e,action,data){
				$scope.hideModal();

				switch( action ){
					case "collection.save":
						var __menuItem = {
							key: data.name,
							children: data.collection
						}
						$scope.$broadcast( 'menu.add-item', __menuItem );
						$scope.$broadcast( 'menu.go-home' );
						data.name = '';
						break;
					case "folder.name":
						data.folder.key = data.key.toString();
						break;
				}
			});

			$scope.showModal = function( form ){
				$scope.modal_form_model = form;
				$scope.displayModal = true;
			}

			$scope.hideModal = function(){
				$scope.displayModal = false;
				$scope.modal_form_model = $scope.forms.save_collection_form;
			}

		}
	]);
});