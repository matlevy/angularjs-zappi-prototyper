define(['./module'], function (directives) {

  directives.directive("zappiWordSelector", ["$timeout", "$animate", function($timeout, $animate){
    return {
      restrict: 'E',
      scope: {
        isVisible: '=',
        options: "=",
        selected: "=",
        onPrefedinedWordSelect: '=',
        maxCustom: "=",
        showInstructions: "@",
        label: "@"
      },
      link: function( $scope, $el, $at) {

        $animate.enabled(false,$el) // Disables animations;

        if( $scope.showInstructions == undefined || $scope.showInstructions == null )
          $scope.showInstructions = 'true';

        if( $scope.label == "" )
          $scope.label = "Type a word e.g. funny and hit 'enter'";

        $($el).on('keyup', function(e){
          if(e.which==13||e.keyCode==13){
            $scope.populate();
          } else if(e.which==27||e.keyCode==27) {
            $scope.searchText="";
          } else {

          }
        })

        $($el).find('.text-input').on('blur', function(){
          $scope.populate();
        })

        $scope.populate = function(){
          if( $scope.searchText.indexOf(',')>0 ){
            var words = $scope.splitToArrayOfStrings( $scope.searchText );
            $timeout(function(){
              angular.forEach( words, function( word ){
                $scope.addCustomWord( word );
                $scope.searchText="";
              });
            }, 50);
          } else {
            $timeout(function(){
              $scope.addCustomWord( $scope.searchText );
              $scope.searchText="";
            }, 50);
          }
        }

        $scope.splitToArrayOfStrings = function(s){ // Ideally shify to formatter
          return s.split(/\,[\s]+|\,/).map( function(v){ return v.replace(/\s\s/ig, '') } );
        }

        $timeout(function(){
          $($el).find('.text-input').on('focus', function(){
            $timeout(function(){
              //$scope.searchText = "";
              //$scope.showAll=false;
            }, 100 );
          });
        }, 100 );

        $scope.getRemainingWordCount = function(){
          return $scope.maxCustom - $scope.getCustomWordCount();
        }

        $scope.getCustomWordCount = function(){
          var __c = 0;
          for( var i=0; i<$scope.selected.length; i++ ){
            if($scope.selected[i].is_custom )
              __c++;
          }
          return __c;
        }

        $scope.search = function( collection_item, index ){
          if( $scope.searchText.length == 0 )
            return $scope.wordIsNotAlreadySelected( collection_item );

          if( $scope.searchText.indexOf(',')==-1 ){
            return $scope.wordIsASuggestedWord( $scope.searchText, collection_item ) && $scope.wordIsNotAlreadySelected( collection_item );
          } else {
            var searchPhrases = $scope.splitToArrayOfStrings( $scope.searchText );
            var includeInResult = false;
            angular.forEach( searchPhrases, function( phrase ){
              if( $scope.wordIsASuggestedWord( phrase, collection_item ) && $scope.wordIsNotAlreadySelected( collection_item ) ){
                includeInResult = true;
              }
            });
            return includeInResult;
          }
        }

        $scope.wordIsASuggestedWord = function(word,word_option){
          if( word == "")
            return false;
          return word_option.key.toLowerCase().indexOf( word.toLowerCase() )>-1;
        }

        $scope.wordIsNotAlreadySelected = function(word_option){
          return $scope.selected.indexOf(word_option) == -1;
        }

        $scope.clearSelected = function(){
          $scope.selected=null;
          $scope.showAll=false;
          $scope.searchText = "";
          $timeout(function(){
            $el.find('.search').focus();
          }, 100);
        }

        $scope.onItemSelect = function(v){
          $timeout(function(){
            $scope.searchText = $scope.splitToArrayOfStrings( $scope.searchText ).join(','); // Clean up spaces
            $scope.searchText = $scope.searchText.replace( new RegExp(v.key + '[\,]{0,1}', 'i'),'') // remove the selected word from the search string and the comma
          }, 50 );
        }

        $scope.removeSelected = function(v){
          $scope.selected.splice($scope.selected.indexOf(v),1);
        }

        $scope.searchText = "";
        $scope.showAll = false;

        $scope.showAllOptions = function(){
          $scope.showAll = true;
        }

        $scope.hideAllOptions = function(){
          $scope.showAll = false; 
        }

        $scope.addCustomWords = function(words){
          angular.forEach( words, function(v,i){
            $scope.addCustomWord(v);
          })
        }

        $scope.addCustomWord = function(word){
          if($scope.getRemainingWordCount()>0 && word.length>0){
            var custom_word = {
              key: word,
              value: word,
              is_custom: true
            }
            $scope.selected.push( $scope.validateCustomWord(custom_word) );
            $scope.onItemSelect( $scope.validateCustomWord(custom_word) );
            $scope.searchText = "";
          }
        }

        $scope.selectItem = function(v){
          $scope.selected.push( v );
          $scope.onItemSelect( v );
        }

        $scope.validateCustomWord = function(word){
          for( var i=0; i<$scope.options.length; i++ ){
            if($scope.options[i].key.toLowerCase() == word.key.toLowerCase() )
              return $scope.options[i];
          }
          return word;
        }

        $scope.$watch( 'searchText', function(v){
          $scope.showAll=false;
        } );

        $scope.$watch( 'showAll', function(v){
          if(v==true)
            $scope.searchText = "";
        } );

        $scope.$watch( 'selected', function(v){
          if(v!=null)
            $scope.searchText = "";
        });

        $scope.getLabel = function(option){
          if(option==null)
            return ""
          return option["key"] != undefined ? option["key"] : option;
        }

      },
      templateUrl: ( (zappi_forms!=null && zappi_forms!=undefined) ? zappi_forms.templates : '/angular/templates' ) + '/zappi_forms/zappi_word_selector.html'
    };
  }]);

});