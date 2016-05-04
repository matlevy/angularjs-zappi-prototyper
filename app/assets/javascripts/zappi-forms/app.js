define([
    'angular',
    'zappi-forms-js/controllers/index',
    'zappi-forms-js/directives/index',
    'zappi-forms-js/services/index',
    'zappi-forms-js/vo/index'
], function (ng) {
    'use strict';

    return ng.module('zappiforms', [
        'zappiforms.services',
        'zappiforms.controllers',
        'zappiforms.directives',
    ]);
});