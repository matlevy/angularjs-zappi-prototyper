zappi_forms = null;

require.config({

  // alias libraries paths
    paths: {
        'domReady': 'vendor/requirejs-domready/domReady',
        'angular': 'vendor/angular/angular',
        'angularRoute': 'vendor/angular-route/angular-route',
        'angularAnimate': 'vendor/angular-animate/angular-animate',
        'jquery': 'vendor/jquery/dist/jquery',
        'bootstrap_css': 'vendor/bootstrap/dist/js/bootstrap',
        'joyride': 'vendor/jquery-joyride/jquery.joyride-2.1',
        'zappi-forms' : 'assets/javascripts/zappi-forms/app',
        'zappi-forms-js' : 'assets/javascripts/zappi-forms/',
        'prototypes' : 'prototypes/app',
        'prototype-modules' : 'prototypes',
        'zappi-designer' : 'designer/app',
        'zappi-designer-js' : 'designer',
        'date_time_picker' : 'vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'moment' : 'vendor/moment/min/moment.min'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'bootstrap_css': {
            exports: 'bootstrap',
            deps: ['jquery']
        },
        'date_time_picker': {
            exports: 'datetimepicker',
            deps: ['bootstrap_css','moment']
        },
        'angular': {
            exports: 'angular'
        },
        'angularRoute': ['angular'],
        'angularAnimate': ['angular'],
        'jquery': {
            exports: 'jquery'
        }
    },

    // kick start application
    deps: ['./bootstrap','date_time_picker']
});