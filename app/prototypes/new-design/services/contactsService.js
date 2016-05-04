define(['../module'], function ( module ) {

  module.factory('ContactsService',["$http", function($http) {

	var contactsService = {
	    async: function() {
	    	var promise = promise || null;
	      	if ( !promise ) {
	        	promise = $http.get('/prototypes/contacts.json').then(function (response) {
	          	return response.data;
	        });
	      }
	      return promise;
	    }
	  };

	  return contactsService

  }]);

});