define([
    'require',
    'angular',
    'routes',
 	'jquery',
    'zappi-forms',
    'prototypes',
    'zappi-designer',
], function (require, ng) {
    'use strict';

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['zappiforms','proto']);
    });
});