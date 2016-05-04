define([
    'angular',
    'zappi-designer-js/controllers/index',
    'zappi-designer-js/services/index'
], function (ng) {
    'use strict';

    return ng.module('zappiforms.designer', [
        'zappiforms.designer.controllers',
        'zappiforms.designer.services'
    ]);
});