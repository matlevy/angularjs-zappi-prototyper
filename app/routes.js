define(['prototypes'], function (apps) {
    'use strict';

    return apps.config(['$routeProvider', function ($routeProvider) {

        ///$routeProvider.when('/config-demo/:prototype_name', {
        //    templateUrl: '/prototypes/design-elements/html-partials/form-demo.html'
        //});

        $routeProvider.when('/new-design/:prototype_name/:domain?/:product?/:image?', {
            templateUrl: '/prototypes/new-design/page-layout.html',
            reloadOnSearch: false
        });

        $routeProvider.when('/datacollector/:prototype_name/:domain?/:product?/:next?', {
            templateUrl: '/prototypes/datacollector/page-layout.html',
            reloadOnSearch: false
        });

        $routeProvider.when('/new-design-user/:prototype_name/:domain?/:product?/:image?', {
            templateUrl: '/prototypes/new-design/page-layout-loggedout.html',
            reloadOnSearch: false
        });

        $routeProvider.when('/new-design', {
            templateUrl: '/prototypes/new-design/index.html'
        });

        $routeProvider.when('/fluid', {
            templateUrl: '/prototypes/fluid/index.html'
        });

        $routeProvider.when('/datacollector', {
            templateUrl: '/prototypes/new-design/index.html'
        });

        $routeProvider.when('/designer', {
            templateUrl: '/designer/index.html'
        });

        $routeProvider.when('/test', {
            templateUrl: '/prototypes/test/demo.html',
            controller: 'TestController'
        });

        $routeProvider.otherwise({
            redirectTo: '/new-design'
        });
    }]);
});