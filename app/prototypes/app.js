define([
    'angular',
    'angularRoute',
    'angularAnimate',
    'prototype-modules/design-elements/index',
    'prototype-modules/creative_test/index',
    'prototype-modules/custom_question/index',
    'prototype-modules/estatic/index',
    'prototype-modules/mmr/index',
    'prototype-modules/linknow/index',
    'prototype-modules/linknow_digital/index',
    'prototype-modules/linknow_tv/index',
    'prototype-modules/new-design/index',
    'prototype-modules/datacollector/index',
    'prototype-modules/products/index',
    'prototype-modules/fluid/index',
], function (ng,angularRoute,angularAnimate) {
    'use strict';
    return ng.module('proto', [
        'ngRoute',
        'ngAnimate',
        'proto.design-elements',
        'proto.creative_test',
        'proto.estatic',
        'proto.linknow',
        'proto.linknow_digital',
        'proto.linknow_tv',
        'proto.custom_question',
        'proto.mmr',
        'proto.newdesign',
        'proto.newdesign.products',
        'proto.datacollector',
        'proto.fluid'
    ]);
});