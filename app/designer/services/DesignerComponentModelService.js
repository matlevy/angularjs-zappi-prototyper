define(['./module', 'zappi-forms-js/vo/module'], function (services, vo) {

  	services.factory('DesignerComponentModelService',["$http", function($http) {
  		
  		return {
  			createFormModel: function(){
  				return new vo.form();
  			},
  			addFormPage: function(form, id, title, index){
  				return form.addNewPage( id, title, index );
  			}
  		}

  	}]);

});