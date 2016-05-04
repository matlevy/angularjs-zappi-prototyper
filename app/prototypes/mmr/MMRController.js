define(['./module'], function (mmr) {

	mmr.controller('MMRController', ['$rootScope', '$scope', 'MMROptionsModel', 'MMRChoicesModel', 'MMRFormModel', "$route", "$routeParams",
	 function( $rootScope, $scope, MMROptionsModel, MMRChoicesModel, MMRFormModel, $route, $routeParams ){
		
		$scope.models = {};
		$scope.edit = {};
		$scope.problems = [];

		$scope.models.options = MMROptionsModel.getOptions();
		$scope.models.choices = MMRChoicesModel;
		$scope.models.form = MMRFormModel;

		$scope.onNewMedia = function( media_object ){
			if( $scope.models.choices.media.length < 5 )
				$scope.models.choices.media.push( media_object );
		}

		$scope.goBackToChooseTemplate = function(v){
			$scope.models.form.selectedPackGallery = null;
			angular.forEach( $scope.models.choices.package_images, function(v,i){
				$scope.models.choices.package_images[i].media = null;
			});
		}

		$scope.onPackCategoryClick = function(v){
			$scope.models.form.selectedPackGallery = v;
			angular.forEach( v.value.items, function(v,i){
				$scope.models.choices.package_images[i].media = v;
			});
		}

		$scope.onPackageImageClick = function(v){
			$scope.models.form.currentSelectedPackImage = v;
			$scope.openModal( { modalId: 'zappistore.products.mmr.packageImageEdit' } );
		};

		$scope.onMediaRemove = function( media_object ){
			$scope.models.choices.media.splice( $scope.models.choices.media.indexOf(media_object), 1 );
		}

		$scope.openModal = function( data ){
			$rootScope.$broadcast( 'zappistore.view.modal.open', data );
		}

		$rootScope.$broadcast( 'zappistore.view.modal.register', {

			id: 'zappistore.products.mmr.packageImageEdit',
			template: '/prototypes/mmr/mmr_image_editor.html'

		} );

		$scope.$on('package.goback', function(){
			$scope.goBackToChooseTemplate();
		})

		// Used in the modal to the right. Maybe seperate to alternate controller. For now just keeping in one controller to make
		// easier to manage.

		$scope.onNewPackageImage = function( media_object ){
			$scope.models.form.currentSelectedPackImage.media = media_object;
		}

		$scope.onNewPackageImageUploaded = function(){
			$rootScope.$broadcast( 'zappistore.view.modal.close' );
		}

		$scope.onModalPackCategoryClick = function(v){
			angular.forEach( v.value.items, function( current,i){
				$scope.models.form.currentPackGallery[i] = { media: current };
			});
			$scope.models.form.modalGalleryState = 'images';
		}

		$scope.onModalPackageImageClick = function(v){
			$scope.models.form.currentSelectedPackImage.media = v.media;
			$rootScope.$broadcast( 'zappistore.view.modal.close' );
		}

		$scope.switchModalGalleryView = function(v){
			$scope.models.form.modalGalleryState = 'galleries';
		}

		$scope.gotoNextPage = function(){
			console.log('here');
		}

		$rootScope.$on( "zappi.forms.complete", function(){
			$route.updateParams({
              page: 0,
              prototype_name: 'confirmation',
              skin: $routeParams.skin,
              headerImage: 'launch'
            })
		});
		
	}]);

});