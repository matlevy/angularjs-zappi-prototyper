zappistoreApp.controller('ConfigPrototypeEController', ['$rootScope', '$scope', '$sce', '$timeout', '$interval', function($rootScope, $scope, $sce, $timeout, $interval){

  // Dumy modal data, should proably be passed in a service or something

  $scope.allChoices = [];

  $scope.countries = [
    {
      key: "United Kingdom",
      value: [ "Midlands and Wales", "North and Northern Ireland", "Scotland", "South and London" ]
    },
    {
      key: "China",
      value: [ "Beijing", "Changsha", "Chengdu", "Chongqing", "Dalian", "Foshan", "Fuzhou", "Guangzhou", "Hangzhou", "Jinan", "Kunming", "Lanzhou", "Qingdao", "Shanghai", "Shenyang", "Shenzhen", "Wuhan", "Xiamen", "Xian", "Zhengzhou" ]
    },
    {
      key: "France",
      value: [ "Bourgogne, Auvergne, Limousin", "Champagne-Ardenne, Lorraine, Alsace", "Haute-Normandie, Basse-Normandie, Bretagne", "Ile-de-France / Region Parisienne", "Midi-Pyrénées, Aquitaine", 
      "Nord-Pas-de-Calais, Picardie", "Pays de la Loire, Centre, Poitou-Charentes", "Provence-Alpes-Côte d'Azur, Languedoc-Roussillon, Corse", "Rhone-Alpes, Franche-Comte" ]
    },
    {
      key: "Ireland",
      value: [],
    },
    {
      key: "Germany",
      value: [ "Baden-Württemberg", "Bayern", "Berlin", "Hamburg, Bremen, Schleswig-Holstein, Niedersachsen", "Hessen, Rheinland-Pfalz, Saarland", "Mecklenburg-Vorpommern, Brandenburg, Sachsen-Anhalt", "Nordrhein-Westfalen", "Thürlingen, Sachsen" ]
    },
    {
      key: "Spain",
      value: [],
    }
  ]

  $scope.ages = [ "18-25","26-35","36-45","46-55","56-75" ];

  $scope.sexes = [ "Male","Female" ]

  $scope.completions = [ "100","150","200" ]

  $scope.behaviours = [
      { key: "Technology Users", value: ["Video Game Owners", "Smart Phone Owners"] },
      { key: "Life Stages", value: [ "Moms", "Moms of Kids under 3" ] },
      { key: "Health", value: [ "Chronic Healh Sufferers" ] },
      { key: "Automotive", value: [ "New Car Owners", "Large Car Purchase Intenders", "Midsized Car Purchase Intenders", "Small Car Purchase Intenders" ] },
      { key: "Behaviour", value: [ "Smokers", "Credit Card Users", "Outdoor Enthusiasts", "Cooking", "Snacking Cheese Eaters" ] },
      { key: "Travel", value: [ "Business Travellers", "Leisure Travellers", "Hotel Stayers" ] },
      { key: "Income", value: [ "High Income DE", "Middle Income DE", "Low Income DE", "Consumer / Purchasing" ] },
      { key: "Purchase Intent", value: [ "Broadband Purchase Intenders", "TV Provider Purchase Intenders", "Kitchen / White Goods Purchase Intenders", "Mobile Phone Contract Purchase Intenders", "Mobile Phone Handset Hurchase Intenders",
        "Laptop/Desktop/Tablet Purchase Intenders", "Primary Grocery Shopper", "Chocolate Purchasers" ] }
    ]

  $scope.surveyTypes = [ 
    {
      key: "Survey a National Representative Sample",
      value: "national" 
    },{ 
      key: "Construct my own target group",
      value: "custom"
    } ]

  $scope.executions = [1,2,3,4,5];

  $scope.problems = [];

  // Audience config modal properties (should be abstracted out to a service / modal and injected into the controller )

  $scope.surveyType = null;
  $scope.currentSelectedCountry = $scope.countries[0];
  $scope.currentSelectedRegions = [];
  $scope.currentSelectedBehaviourGroup = null;
  $scope.currentSelectedBehaviourItem = null;
  $scope.currentSelectedSex = null;
  $scope.currentSelectedAges = [];
  $scope.currentCompletions = 150;
  $scope.currentExecutions = 1;
  $scope.currentPrice = "£" + Math.floor((Math.random() * 1000)*100) / 100;
  $scope.currentTime = Math.round(Math.random()*4) +'hrs';

  // View properties

  $scope.showTargetCountry = false;
  $scope.showTargetRegions = false;
  $scope.showTargetDemographics = false;
  $scope.showTargetDemographicsItem = false;
  $scope.showTargetGenders = false;
  $scope.showTargetAges = false;
  $scope.showCompletions = false;
  $scope.showHelp = false;
  $scope.showExecutions = false;
  $scope.priceIsUpdating = false;
  $scope.isInDemoMode = false;

  $scope.showSubQuestions = false;
  $scope.targetCustom = false;

  // Changes in the model data based on user selections. Should probably be abtracted so that just the model is passed in and all this logic is controlled in some kind of model

  var updateOnChange = ['showExecutions','showTargetDemographics','showTargetAges','currentExecutions','currentSelectedCountry','currentSelectedBehaviourGroup','showTargetGenders','showCompletions','showTargetDemographics',
    'currentSelectedCountry','currentSelectedRegions','currentSelectedBehaviourGroup','currentSelectedBehaviourItem','currentSelectedSex','currentSelectedAges','currentCompletions','surveyType', 'showTargetRegions' ]

  $scope.updateTimeout = null;

  angular.forEach( updateOnChange, function(v,i){
    $scope.$watch( v, function(v){
      $scope.triggerUpdate();
    }, true);
  });

  $scope.$watch( 'surveyType', function(v){
    $scope.targetCustom = v!=null ? (v.value == "custom") : false;
    if( $scope.targetCustom == false ){
      $scope.targetNational();
    }
  }, true );

  $scope.$watch( 'showTargetRegions', function(v){
    if( $scope.currentSelectedCountry.value.length>0 ){
      $scope.currentSelectedRegions = [];
      if(v==true){
        if( $scope.currentSelectedCountry.value.length==0 ){
          $scope.showTargetRegions = false;
        }
      } else {
        angular.forEach( $scope.currentSelectedCountry.value, function(v,k){
          $scope.currentSelectedRegions.push( v );      
        });
      }
    } else {
      $scope.showTargetRegions = false;
    }
  }, true);

  $scope.$watch( 'showExecutions', function(v){
    $scope.currentExecutions = (v == false) ? 1 : $scope.currentExecutions;
  }, true);

  $scope.$watch( 'showTargetDemographics', function(v){
    $scope.currentSelectedBehaviourGroup = null;
    $scope.currentSelectedBehaviourItem = null;
  }, true);

  $scope.$watch( 'showTargetAges', function(v){
    $scope.currentSelectedAges = [];
  }, true);

  $scope.$watch( 'currentSelectedBehaviourGroup', function(v){
    $scope.currentSelectedBehaviourItem = null;
    $scope.showTargetDemographicsItem = false;
    $timeout( function(){
      $scope.showTargetDemographicsItem = true;
    }, 1000 );
  },true);

  $scope.$watch( 'currentSelectedBehaviourItem', function(v){
    $scope.showSubQuestions = (v!=null) | $scope.showSubQuestions==true;
  }, true);

  $scope.$watch( 'showTargetGenders', function(v){
    $scope.currentSelectedSex = null;
  }, true);

  $scope.$watch( 'showCompletions', function(v){
    if( v==false )
      $scope.currentCompletions = 150;
  }, true);

  $scope.$watch( 'showTargetDemographics', function(v){
    $scope.showSubQuestions = (v!=true) | $scope.showSubQuestions==true;
  })

  //

   $scope.triggerUpdate = function(){
    if( $scope.updateTimeout != null )
        $timeout.cancel( $scope.updateTimeout );
    $scope.updateTimeout = $timeout( function(){
      console.log('updating...')
      $scope.updateChoicesStatement();
      $scope.updateProblems();
      $scope.fakePriceUpdate();
    }, 50 );
  }

  // FAKE PRICE UPDATE
  // set $scope.priceIsUpdating to true and then false when complete;

  $scope.fakePriceUpdateTimeOut = null;
  $scope.fakeQuoteValuesTimer = null;

  $scope.fakePriceUpdate = function(){

    console.log('updating price...')

    if( $scope.isComplete() ){

      $scope.priceIsUpdating = true;

      if( $scope.fakePriceUpdateTimeOut != null )
        $timeout.cancel($scope.fakePriceUpdateTimeOut);

      if( $scope.fakeQuoteValuesTimer != null )
        $interval.cancel($scope.fakeQuoteValuesTimer);

      $scope.fakePriceUpdateTimeOut = $timeout( function(){
        $scope.priceIsUpdating = false; 
        if( $scope.fakeQuoteValuesTimer != null )
          $interval.cancel($scope.fakeQuoteValuesTimer);     
      }, 1000 );

      $scope.fakeQuoteValuesTimer = $interval( function(){
        $scope.randomQuote();
      }, 50 );

    } else {
      console.log('not complete')
    }
  }

  $scope.randomQuote = function(){
    $scope.currentPrice = "£" + Math.floor((Math.random() * 1000)*100) / 100;
    $scope.currentTime = Math.round(Math.random()*4) +'hrs';
  }

  //

  $scope.targetBothSexes = function(){
    $scope.showTargetGenders = false;
  }

  $scope.selectAllRegions = function(){
    angular.forEach( $scope.currentSelectedCountry.value, function(v,i){
      $scope.currentSelectedRegions.push(v);
      });
     $scope.showTargetRegions = false;
  }

  $scope.getChoices = function(type){
    var r = []

    angular.forEach( $scope.allChoices, function(v,i){
      if(v.key==type)
        r.push(v);
    })

    return r;
  }

  $scope.hasChoices = function(type){
    return $scope.getChoices(type).length>0;
  }

  $scope.blinkArea = function(classRef){
    $('.blink').removeClass('blink');
    $('.'+classRef).addClass('blink');
    setTimeout( function(){
      $('.blink').removeClass('blink');
    }, 500);
  }

  /// Used in the right panel for the choices statement component.

  $scope.updateChoicesStatement = function(){

    if( $scope.targetCustom == true ){

      $scope.statements = [
        {
          prefix: function(){ return '' },
          text: function(){ return $scope.currentCompletions },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showCompletions=true; $scope.blinkArea('completions') },
          question_anchor: 'completions'
        },
        {
          prefix: function(){ return ' completions from ' },
          text: function(){ return $scope.currentSelectedSex==null ? 'males and females' : $scope.currentSelectedSex.toLowerCase().concat('s') },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showTargetGenders=true; $scope.blinkArea('genders') },
          question_anchor: 'genders'
        },
        {
          prefix: function(){ return ' aged ' },
          text: function(){ 
            if($scope.currentSelectedAges.length==$scope.ages.length)
              return '18 and over'
            if($scope.currentSelectedAges.length>0)
              return 'between ' + $scope.currentSelectedAges.join(', ').replace( /\,\s(?!.*\,\s)/, ' or ' );
            return '18 and over' },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showTargetAges=true; $scope.blinkArea('ages') },
          question_anchor: 'ages'
        },
        {
          prefix: function(){ return ($scope.currentSelectedCountry.value.length>0) ? ' living ' : ' from anywhere ' },
          text: function(){ 
            if($scope.currentSelectedCountry.value.length==0)
              return ''
            if($scope.currentSelectedRegions.length==$scope.currentSelectedCountry.value.length)
              return 'anywhere'
            if($scope.currentSelectedRegions.length>0)
              return 'in ' + $scope.currentSelectedRegions.join(', ').replace( /\,\s(?!.*\,\s)/, ' or ' );
            return 'anywhere' },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showTargetRegions=true; $scope.blinkArea('region') },
          question_anchor: 'region'
        },
        {
          prefix: function(){ return $scope.countryPrefixesThe($scope.currentSelectedCountry.key) ? ' in the ' : ' in ' },
          text: function(){ return $scope.currentSelectedCountry.key },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showTargetCountry=true; $scope.blinkArea('country') },
          question_anchor: 'country'
        },
        {
          prefix: function(){ return ' who are ' },
          text: function(){ return $scope.currentSelectedBehaviourItem !=null ? '' + $scope.currentSelectedBehaviourItem : ' from any demographic groups type' },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showTargetDemographics=true; $scope.blinkArea('demographic') },
          question_anchor: 'demographic'
        },
      ];

    } else {

      $scope.statements = [
        {
          prefix: function(){ return '' },
          text: function(){ return $scope.currentCompletions },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showCompletions=true; $scope.blinkArea('completions') },
          question_anchor: 'completions'
        },
        {
          prefix: function(){ return $scope.countryPrefixesThe($scope.currentSelectedCountry.key) ? ' poeple in the ' : ' people in ' },
          text: function(){ return $scope.currentSelectedCountry.key },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showTargetCountry=true; $scope.blinkArea('country') },
          question_anchor: 'country'
        },
        {
          prefix: function(){ return ' and question a ' },
          text: function(){ return 'National Representative of this country' },
          class: 'zappi-blue-txt',
          action: function(){ $scope.showTargetDemographics=true; $scope.blinkArea('survey-type') },
          question_anchor: 'demographic'
        },
      ];

    }

  }

  $scope.updateProblems = function(){
    $scope.addProblemIf( $scope.targetCustom==true && $scope.showTargetRegions == true && $scope.currentSelectedRegions.length==0, "Choose at least one region within " + $scope.prefixCountry($scope.currentSelectedCountry.key) + ".", 2 );
    $scope.addProblemIf( $scope.targetCustom==true && $scope.showTargetDemographics == true && ( $scope.currentSelectedBehaviourItem==null || $scope.currentSelectedBehaviourGroup==null ), "Choose a demographic group and item.", 3 );
    $scope.addProblemIf( $scope.targetCustom==true && $scope.showTargetAges == true && $scope.currentSelectedAges.length == 0, "Select at least one age group.", 4 );
    $scope.addProblemIf( $scope.targetCustom==true && $scope.showTargetGenders == true && $scope.currentSelectedSex == null, "Select a sex - male, female or both.", 5 );
  }

  $scope.isComplete = function(){
    return $scope.problems.length==0;
  }

  $scope.addProblemIf = function( condition, problem, id ){
    if( condition && !$scope.hasProblem(id) ){
      $scope.problems.push( { id: id, text: problem })      
    } else if( $scope.hasProblem(id) &!condition ) {
      $scope.removeProblem( id );
    }
  }

  $scope.hasProblem = function(id){
    for( var i=0; i<$scope.problems.length; i++ ){
      if( $scope.problems[i].id == id )
        return true;
    }
    return false;
  }

  $scope.canSelectRegion = function(){
    return !($scope.currentSelectedCountry!=null && $scope.currentSelectedCountry.value.length>0);
  }

  $scope.removeProblem = function(id){
    angular.forEach( $scope.problems, function(v,i){
      if( v.id == id )
        $scope.problems.splice(v,1);
    });
  }

  $scope.toggleHelp = function(){
    $scope.showHelp = !$scope.showHelp;
  }

  // Should be in some kind of utility, basically outside this controlllers

  $scope.prefixCountry = function(n){
    return $scope.countryPrefixesThe(n) ? 'the ' + n : n;
  }

  $scope.countryPrefixesThe = function(n){
    return ["United Kingdom"].indexOf(n) >= 0;
  }

  // END

  $scope.selectionComplete = function(){
    alert('Thanks!');
  }

  $scope.setDefaults = function(){
    $scope.surveyType=null;
  }

  $scope.targetNational = function(){

    $timeout( function(){
      $scope.surveyType = $scope.surveyTypes[0];
      $scope.currentSelectedAges = [];
      $scope.showTargetCountry = false;
      $scope.showTargetRegions = false;
      $scope.showTargetDemographics = false;
      $scope.showTargetDemographicsItem = false;
      $scope.showTargetGenders = false;
      $scope.showTargetAges = false;
      $scope.showCompletions = false;
      $scope.showHelp = false;

      $timeout( function(){
        $scope.currentSelectedSex = "Both";
        $scope.showTargetGenders = false;
      }, 200);

      angular.forEach( $scope.ages, function(v,i){
        $scope.currentSelectedAges.push(v);
      });

      $scope.targetCustom = false;

    }, 200 );
  }

  $scope.exitDemo = function(){
    $scope.isInDemoMode = false;
  }

  $scope.setToDemoMode = function(){
    // Abstract method used when tutorials are presented within the form
    // used to set the form into demo mode where static models are used to speed up the demo
    console.log('in demo mode');
    $scope.targetCustom = true;
  }

  $scope.setDefaults();
  $scope.targetNational();

  /// Event listeners

  $scope.$on('configuration.demoCustomOptions', function(e,a){
     $timeout( function(){
      $scope.showTargetDemographics = true;
      $scope.showTargetGenders = true;
      $scope.showTargetAges = true;
    }, 100 );
  });

  $scope.$on('configuration.selectDemoOptions', function(e,a){
     $timeout( function(){
      $scope.currentSelectedBehaviourGroup = $scope.behaviours[0];
      $timeout( function(){
        $scope.currentSelectedBehaviourItem = $scope.behaviours[0].value[0];
      }, 100 )
      $scope.currentSelectedAges = [ "18-25","36-45"];
      $scope.currentSelectedSex = null;
    }, 100 );
  });

  $scope.$on('configuration.completeDemoOptions', function(e,a){
     $timeout( function(){
      $scope.currentSelectedSex = "Male";
    }, 100 );
  });

  $scope.$on('configuration.setToCustom', function(e,a){
     $scope.targetCustom = true;
  });

  $scope.$on('configuration.setToNational', function(e,a){
     $scope.targetNational();
  });

  $scope.$on('configuration.setToDemoMode', function(e,a){
     $scope.setToDemoMode();
  })

  $scope.$on('configuration.showCompletions', function(e,a){
     $scope.showCompletions = true;
  })

  $scope.$on('configuration.showExecutions', function(e,a){
     $scope.showCompletions = true;
  })

  $scope.$on('configuration.setCustomSurvey', function(e,a){
     $scope.targetCustom==true;
  })

  $scope.$on('configuration.reset', function(e,a){
     $scope.targetNational();
  })

  $scope.$on('configuration.exitDemo', function(e,a){
    $scope.exitDemo();
  });

}]);
