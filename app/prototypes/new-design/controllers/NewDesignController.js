define(['../module'], function (custom_question) {

	custom_question.controller('NewDesignController', ['$rootScope', '$scope', '$interval', '$timeout', '$route', "$routeParams", "$animate", "ProtoTypeIndexService",
		function($rootScope, $scope, $interval, $timeout, $route, $routeParams, $animate, protoTypeIndexService){

			$animate.enabled(true);

			$scope.problems = [];
			$scope.models = {};
			$scope.page = {};
			
			// Simple model for the page header when demoing

			$scope.page.title = "Configure Your Survey";
			$scope.page.page_title = "sdfsd";
			$scope.page.domain = $routeParams.domain ? $routeParams.domain : "zappi";
			$scope.page.product = $routeParams.product;
			$scope.page.image = $routeParams.image ? $routeParams.image : ( $routeParams.domain ? "" : "product" );

			/// Currencies

			$scope.showCurrencies = false;

			$scope.toggleCurrencies = function(){
				$scope.showCurrencies = !$scope.showCurrencies;
			}

			// Order confirmation placeholder data 

			$scope.page.orderconfirm = {
				pages: [],
				current_page: null,
				payment_methods: {
					items: [ { key: "Credit Card", value: "by-card" } ],
					selected: null
				}
			}

			$scope.page.orderconfirm.payment_methods.selected = $scope.page.orderconfirm.payment_methods.items[0];

			// Contact page placeholder

			$scope.contact = {};
			$scope.contact.name = "null";
			$scope.contact.email = null;
			$scope.contact.subject = null;
			$scope.contact.message = null;

			// My acccount placeholder model

			$scope.page.account = {
				details: {
					forname: "Matthew",
					surname: "Levy",
					email: "mat@zappistore.com",
					telephone: "0206565433",
					company_name: "ZappiStore",
					company_address_1: "129-133 Camden Road",
					company_address_2: "Camden",
					company_postcode: "N194GH",
					use_for_billing: false,
					contactZappi: false,
					contactPartners: false,
					job_types: {
						items: [
							{ key: 'Not specified', value: 'Not specified' },
							{ key: 'Planner', value: 'Planner' },
							{ key: 'Planning Director', value: 'Planning Director' },
							{ key: 'Head of Planning / Strategy', value: 'Head of Planning / Strategy' },
							{ key: 'Brand Manager', value: 'Brand Manager' },
							{ key: 'Marketing Director', value: 'Marketing Director' },
							{ key: 'Marketing Manager', value: 'Marketing Manager' },
							{ key: 'Product Manager', value: 'Product Manager' },
							{ key: 'Research Executive', value: 'Research Executive' },
							{ key: 'Research Manager', value: 'Research Manager' },
							{ key: 'Research Director', value: 'Research Director' },
							{ key: 'Insights Manager', value: 'Insights Manager' },
							{ key: 'Insights Director', value: 'Insights Director' },
							{ key: 'Head of Insights', value: 'Head of Insights' },
							{ key: 'Business Development Director', value: 'Business Development Director' },
							{ key: 'Creative Director', value: 'Creative Director' }
						],
						selected: null
					}
				},
				orders: []
			}

			// Orders placeholder data

			$scope.product_names = [ 
				{ key: "Creative Test", value: "Creative Test", logo: "zappiproduct-zappiblue" }, 
				{ key: "Choose It Test", value: "Choose It Test", logo: "zappiproduct-zappired" }, 
				{ key: "LinkNow Digital Test", value: "LinkNow Digital Test", logo: "common-artwork-millwardbrownlogo" }, 
				{ key: "Creative Video Test", value: "Creative Video Test", logo: "common-artwork-millwardbrownlogo" }
			];

			$scope.order_summary = {
				sections: [
					{ name: "Basic Detials", labels: [ 
						{ label: "Brand Name", type: "text", value: "Coca-Cola" },
						{ label: "Pack Title", type: "text", value: "6 Pack MultiPack" },
						{ label: "Product Type", type: "text", value: "Drink" },
						{ label: "Product Name", type: "text", value: "Coke 6 Pack" },
						{ label: "Category", type: "text", value: "Food & Beverage" }
					] },
					{ name: "Customisation", labels: [ 
						{ label: "Words", type: "array", value: [ "big", "bold", "blue" ] },
						{ label: "Statements", type: "array", value: [ "make people kinder", "make people spend more money", "make people want to shop more" ] },
						{ label: "Pack Images", type: "text", value: "Rectangular Shaped" },
					] },
					{ name: "Media", labels: [ 
						{ label: "Pack Shot 1", type: "image", value: "/assets/images/prototyping/pack-images/angular-10.jpg" },
						{ label: "Pack Shot 2", type: "image", value: "/assets/images/prototyping/pack-images/angular-15.jpg" },
					] },
				]
			}

			$scope.clearOrderTypeFilter = function(){
				$scope.report_filters.order = { key: function(){ return true } };
			}

			$scope.report_filters = {
				order: { key: function(){ return true } }
			};

			$scope.generateOrderName = function(){
				var i = Math.round( Math.random() * ($scope.product_names.length-1) ) + 1;
				return i < ($scope.product_names.length-1) ? $scope.product_names[i] : $scope.product_names[1];
			}

			$scope.generateDate = function(){
				var d = new Date()
				d.setMonth( Math.round( Math.random() * 11 ) );
				d.setDate( Math.round( Math.random() * 30 ) );
				return d;
			}

			for( var o=0; o<20; o++ ){
				$scope.page.account.orders.push({
					id: Math.round(Math.random()*5000), order: $scope.generateOrderName(), date: $scope.generateDate(), method: "Credit Card", status: "Awaiting Payment", credit: Math.floor( Math.random() * 1000000 ) / 100
				})
			}

			//

			$scope.feedback_required = true;

			$scope.openFeedBackForm = function(){
				$scope.openModal( { modalId: 'zappistore.myaccount.feedback' } );
			}

			$scope.closeFeedbackForm = function(){
				$rootScope.$broadcast( 'zappistore.view.modal.close' );
				$scope.feedback_required = false;
			};

			$scope.openModal = function( data ){
				$rootScope.$broadcast( 'zappistore.view.modal.open', data );
			}

			$rootScope.$on( 'zappistore.view.modal.ready', function(event,data){
				$rootScope.$broadcast( 'zappistore.view.modal.register', {
					id: 'zappistore.myaccount.feedback',
					template: '/prototypes/feedback-form/form.html'
				});
			});

			$scope.feedback = {
				ratings: [
					{ key: "1", value: "1" },{ key: "2", value: "2" },{ key: "3", value: "3" },{ key: "4", value: "4" },{ key: "5", value: "5" }
				],
				speed: null
			}
			
			//

			$scope.page.account.details.job_types.selected = $scope.page.account.details.job_types.items[3]

			$scope.models.form = {};
			$scope.models.form.current_page = null;
			$scope.models.form.pages = [];

			///

			$scope.gotoPage = function( page ){
				$route.updateParams({
	              page: 0,
	              prototype_name: page,
	              domain: $routeParams.domain
	            })
			}

			$scope.route = $routeParams;
		}
	]);

});