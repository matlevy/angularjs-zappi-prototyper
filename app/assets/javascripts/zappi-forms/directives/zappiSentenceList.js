define(['./module'], function (directives) {

  directives.directive("zappiSentenceList", ["$timeout", function($timeout){
      return {
        restrict: 'E',
        scope: {
        	isVisible: "@",
        	sentences: "=",
        	maxPermitted: "@",
        	placeHolder: "@",
        	newSentence: "=?"
        },
        link: function($scope, $element, $attributes) {
        	
        	if( $scope.newSentence==undefined )
        		$scope.newSentence = "";

        	$($element).on('keyup', function(e){
    	        if(e.which==13||e.keyCode==13){
    	          $timeout(function(){
    	              $scope.addCustomSentence( $scope.newSentence );
    	              $scope.newSentence="";
    	            }, 50);
    	        } else if(e.which==27||e.keyCode==27) {
    	          $scope.searchText="";
    	        } else {

    	        }
    	      })

        	$scope.addCustomSentence = function(text){
        		console.log(text)
        		$scope.sentences.push({ copy: text});
        	}

        	$scope.removeSentence = function(sentence){
        		$scope.sentences.splice($scope.sentences.indexOf(sentence),1);
        	}

        },
        templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_sentence_list.html'
      };
    }]);

});