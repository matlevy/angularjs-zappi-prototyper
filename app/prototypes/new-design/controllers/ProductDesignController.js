define(['../module'], function ( module ) {

	module.controller('ProductDesignController', ['$rootScope', '$scope', '$route', "$routeParams", "$animate",
		
		function( $rootScope, $scope, $route, $routeParams, $animate ){

			$animate.enabled(true);

			$scope.products = [];

			$scope.generateProduct =  function(index){
				return {
					name: "Product " + index,
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel vulputate ligula. Nulla nec magna et magna elementum fermentum. Curabitur vel felis quam. In hendrerit metus et neque condimentum",
					price: Math.round( Math.random() * 1000000 ) / 100,
					tags: $scope.generateProductTags(),
					logo: $scope.generateLogo()
				}
			}

			$scope.generateLogo = function(){
				var logos = ["zappi-product-zappiblue","zappi-product-zappired","common-artwork-millwardbrownlogo"]
				var i = Math.round( Math.random() * logos.length-1 );
				return logos[ i >= logos.length || i<0 ? 0 : i ];
			}

			$scope.generateProductTags =  function(){

				var groups = []

				for( var i=0; i<=1; i++ ){
					var index = Math.round( Math.random() * ( $scope.product_groups.length-1 ) );
					if( groups.indexOf( $scope.product_groups[index] ) == -1 ){
						groups.push( $scope.product_groups[index] )
					}
				}

				return groups;

			}

			$scope.product_groups = [
				{ key: "Creative Testing", value: "creative_testing" },
				{ key: "Product Testing", value: "product_testing" },
				{ key: "Pack Testing", value: "pack_testing" },
				{ key: "Digital", value: "digital" },
				{ key: "Market Share & Brand Equity", value: "market_share" },
			]

			for( var p=0; p<20; p++ ){
				$scope.products.push( $scope.generateProduct(p+1) );
			}

			$scope.choices = {
				selected_group: null,
			}

			$scope.addDummyProduct = function(){
				$scope.products.push( $scope.generateProduct('A') );
			}

			$scope.onProductGroupChanged = function(v){
				
			}

			$scope.product_filter = function(value,index,array){
				if( $scope.choices.selected_group==null )
					return true;
	          	return value.tags.indexOf( $scope.choices.selected_group ) >= 0;
	        }
			
		}

	]);

});