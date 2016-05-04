define(['./module'], function (controllers) {

	controllers.controller('ZappiModalController', ['$rootScope', '$scope', '$sce', '$timeout', '$interval', function($rootScope, $scope, $sce, $timeout, $interval){

		$scope.state = 'closed';
		$scope.containerTop = $(window).scrollTop();
		$scope.modals = [];
        $scope.modal = "";

    	$(window).on('resize', function(){
    		$scope.containerTop = $(window).scrollTop();
    		$scope.$apply();
    	});

    	$(window).on('scroll', function(){
    		$scope.containerTop = $(window).scrollTop();
    		$scope.$apply();
    	})

    	$scope.close = function(){
    		$scope.state = 'closed';
    		$('body').css('overflow','auto');
    	}

    	$scope.open = function(){
    		$scope.state = 'open';
    		$('body').css('overflow','hidden');
    	}

    	$scope.registerModal = function( data ){
    		$scope.modals[ data.id ] = data.template;
    	}

    	$scope.unregisterModal = function( id ){
    		$scope.modals[ data.id ] = null
    	}

    	$rootScope.$on( 'zappistore.view.modal.close', function(event,data){
    		$scope.close();
    	});

    	$rootScope.$on( 'zappistore.view.modal.open', function(event,data){
            $scope.modal = $scope.modals[data.modalId];
    		$scope.open();
    	});

    	$rootScope.$on( 'zappistore.view.modal.register', function(event,data){
    		$scope.registerModal( data );
    	});

    	$rootScope.$on( 'zappistore.view.modal.unregister', function(event,id){
    		$scope.unregisterModal( id );
    	});

        $rootScope.$broadcast( 'zappistore.view.modal.ready' );

	}]);

});