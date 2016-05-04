define(['../module'], function ( module ) {

	module.controller('ContactsController', ['$rootScope', '$scope', '$route', "$routeParams", "ContactsService",
		
		function( $rootScope, $scope, $route, $routeParams, contactsService ){

			$scope.contacts = {
				data: []
			};

			$scope.clearData = function(){
				$scope.contacts.data = []
			}

			$scope.getZappiContactsData = function(){
				contactsService.async().then( function(d){
					$scope.clearData();
					$scope.contacts.data = d.contacts;
					$scope.contacts.domains = d.domains;
					$scope.updateCurrentDomainContacts();
				});
			}

			$scope.refreshDomainContacts = function( current_domain ){
				angular.forEach( $scope.contacts.domains, function( domain, i ){
					if( domain.domain == "demo" ){
						angular.forEach( domain.regions, function( region, i ){
							angular.forEach( region.team_members, function( contact, i ){
								$scope.updateTeamMemberContactDetails( contact.ref, contact );
							});
							console.log(region.contacts)
						});
					}
				});
			}

			$scope.updateCurrentDomainContacts = function(){
				angular.forEach( $scope.contacts.domains, function(v,i){
					if( v.domain == "demo" ){
						$scope.contacts.domain = v;
						$scope.refreshDomainContacts( $scope.contacts.domain.domain );
						return true;
					}
				} );
				return false;
			}

			$scope.updateTeamMemberContactDetails = function( ref, team_contact ){
				angular.forEach( $scope.contacts.data, function( contact, i ){
					if( contact.id == ref )
						team_contact.contact_details = contact;
				} );
				return null;
			}

			$scope.getInitials = function( contact ){
				if(contact)
					return [ contact.forname.substr(0,1), contact.surname.substr(0,1) ].join('').toUpperCase();
				return "";
			}

			$scope.getTeamPositionClasses = function( team_member ){
				
				var type_class = "";

				switch( team_member.type ){
					case "al":
						type_class = "account-lead";
						break;
					case "ce":
						type_class = "client-excellence";
						break;
					case "sp":
						type_class = "support";
						break;
					default: 
						break;
				}

				return type_class.concat(' ').concat( team_member.owner==true ? 'global-account-owner' : '' );
			}

			$scope.getZappiContactsData();

		}

	]);

});