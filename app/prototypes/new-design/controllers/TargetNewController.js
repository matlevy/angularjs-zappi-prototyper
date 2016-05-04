define(['../module'], function ( module ) {

	module.controller('TargetNewController', ['$rootScope', '$scope', '$route', "$routeParams", "TargetGroupService", "DimensionGroupService",
		
		function( $rootScope, $scope, $route, $routeParams, targetGroupService, dimensionGroupService ){

			$scope.models = {
				form: {
					pages: [],
					current_page: {
						title: "Your Survey Participents"
					},
					mode: 'edit',
				}
			}

			$scope.data = {
				countries: [
					{ key: "United Kingdom", value: "United Kingdom", id: 4 },
					{ key: "United States", value: "United States", id:  1 },
				],
				target_categories: [],
				form: { mode: '' },
				country_search: "",
				selected_country: null,
				custom_audience: false,
				custom_regions: false,
				custom_ages: false,
				custom_genders: false,
				target_search: {
					$: "",
					collection_name: "",
					description: "",
					name: ""
				},
				target_maxcount: 10,
				selected_target_group: null,
				customise_target_options: false,
				view_target_segments: false,
			}

			$scope.data.page = {
				percent_panel: {
					id: "percent_graph",
					value: 0,
				},
				pages: [],
				show_categories: true,
				hide_deselected: false,
			}

			$scope.data.selected_country = $scope.data.countries[0];
			$scope.data.target_groups = [];
			$scope.data.dimensions = [];

			$scope.clearTargetGroupData = function(){
				$scope.data.target_groups = [];
				$scope.data.customise_target_options = false;
			}

			$scope.clearTargetGroupCategories = function(){
				$scope.data.target_categories = [];
			}

			$scope.clearDimensionsData = function(){
				$scope.data.dimensions = [];
			}

			$scope.getTargetGroups = function( country, product ){
				$scope.clearTargetGroupData();
				$scope.clearTargetGroupCategories();
				targetGroupService.async( country, product ).then( function(d){
					$scope.data.target_groups = d;
					$scope.selectTargetGroup( $scope.data.target_groups[0] );

					angular.forEach( $scope.data.target_groups, function(v){
						if( $scope.data.target_categories.indexOf(v.collection_name)==-1 )
							$scope.data.target_categories.push(v.collection_name);
					});

					console.log($scope.data.target_groups);
				});
			}

			$scope.toggleCategories = function(){
				$scope.data.page.show_categories = !$scope.data.page.show_categories;
				console.log($scope.data.page.show_categories);
			}

			$scope.getTargetDimensions = function( target_group, country, product ){
				$scope.clearDimensionsData();
				dimensionGroupService.async( target_group, country, 1 ).then( function(d){
					$scope.data.dimensions = d;

					/// Very longinded way of marrying incidence with target dimensions. Might be easier server side

					angular.forEach( $scope.data.selected_target_group.target_group_roots, function( root ){
						angular.forEach( root.dimension_groups, function( tg_dimension_group ){
							angular.forEach( $scope.data.dimensions, function( gs_dimension_group ){
								if( tg_dimension_group.id == gs_dimension_group.id ){
									angular.forEach( tg_dimension_group.dimensions, function( tg_dimension ){
										angular.forEach( gs_dimension_group.dimensions, function( gs_dimension ){
											if( tg_dimension.id == gs_dimension.id ){
												if( tg_dimension.incidence_rate ){
													gs_dimension.incidence = tg_dimension.incidence_rate.value;
												} else {
													gs_dimension.incidence = 0;
												}
												if( root.incidence_rate ){
													gs_dimension.group_incidence = root.incidence_rate.value;
												} else {
													gs_dimension.group_incidence = 0;
												}
											}
										});
									});
								};
							});
						});
					});

					// Make all dimensions selected

					angular.forEach( $scope.data.dimensions, function(dimension){
						dimension.expanded = true;
						dimension.selected = dimension.dimensions.slice(0);
					});

				});
			}

			$scope.showMoreTargetGroups = function(){
				$scope.data.target_maxcount += ( $scope.data.target_maxcount+5<$scope.data.target_groups.length ? 5 : ( $scope.data.target_groups.length-1-$scope.data.target_maxcount ) );
			}

			$scope.selectTargetGroup = function( target_group ){
				$scope.data.selected_target_group = target_group;
				
				if( $scope.data.selected_country )
					$scope.getTargetDimensions( target_group.id, $scope.data.selected_country.id, 1 );	
				
				$scope.data.target_maxcount = 5;	
				$scope.data.form.mode='';
				$scope.data.customise_target_options = false;
				$scope.data.page.selected_target_group = target_group.name;
			}

			$scope.selectTargetGroupCategory = function( target_group_category ){
				$scope.data.target_search.collection_name = target_group_category;
				$scope.data.target_maxcount = 5;
				$scope.toggleCategories();
			};

			$scope.clearTargetFilter = function(){
				$scope.data.target_search.collection_name = '';
			}

			$scope.getDimensionQuestion = function( key ){
				switch( key ){
					case "location" :
						return "Region ";
					case "age_range" :
						return "Age ";
					case "gender" :
						return "Gender "
				}
				return "unknown";
			}

			$scope.getDimensionAllLabel = function( key ){
				switch( key ){
					case "location" :
						return "Select All Regions";
					case "age_range" :
						return "Select All Ages";
					case "gender" :
						return "Select All Genders"
				}
				return "unknown";
			}

			$scope.startEditTarget = function(){
				$scope.data.customise_target_options = false;
				$scope.data.target_maxcount = 5;
				$scope.data.selected_target_group = null;
				$scope.data.form.mode='edit';
			}

			$scope.getDimensionLabel = function(dimension){
				return dimension.name;
			}

			$scope.$watch( 'data.selected_country', function(){
				$scope.data.target_groups = [];
				$scope.data.dimensions = [];
				$scope.data.form.mode='';
				$scope.data.selected_target_group = null;
				if( $scope.data.selected_country ){
					$scope.getTargetGroups( $scope.data.selected_country.id, 1 );	
				}
				$scope.data.target_maxcount = 5;	
				$scope.data.customise_target_options = false;		
			});

			$scope.onTargetAudienceChanged = function(v){
				$scope.calculateTargetRating();
				$scope.data.page.percent_panel.value = $scope.data.overall_coverage;
			}

			$scope.calculateTargetRating = function(){

				$scope.data.selected_audience_coverage = 1;

				if( $scope.data.selected_target_group && $scope.data.selected_target_group.target_group_roots[0] ){
					$scope.data.selected_target_incidence = $scope.data.selected_target_group.target_group_roots[0].incidence_rate.value;
				} else {
					$scope.data.selected_target_incidence = 0;
				}

				$scope.data.overall_coverage = 0;

				angular.forEach( $scope.data.dimensions, function( dimension ){

					dimension.sum_of_group_incidence = 0;
					
					angular.forEach( dimension.selected, function(v){
						dimension.sum_of_group_incidence += v.incidence;
					} );

					dimension.sum_of_group_incidence = Math.round( dimension.sum_of_group_incidence * 1000 ) / 1000;

					angular.forEach( dimension.dimensions, function(v){
						v.percent_of_group = dimension.selected.indexOf(v)!=-1 ? (v.incidence / dimension.sum_of_group_incidence) : 0;
					} );

					$scope.data.selected_audience_coverage *= dimension.sum_of_group_incidence;
					$scope.data.overall_coverage = $scope.data.selected_audience_coverage * $scope.data.selected_target_incidence;

				});

			}

			$scope.$watch('customise_target_options',function(v){
				if(!v){
					angular.forEach( $scope.data.dimensions, function( dimension ){
						dimension.selected = dimension.dimensions.slice(0);
					});
					$scope.calculateTargetRating();
				}
			});

		}

	]);

});