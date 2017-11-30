/*
 *  Copyright © 2016 Magestore. All rights reserved.
 *  See COPYING.txt for license details.
 *
 */

define(
    [
        'jquery',
        'ko',
        'uiComponent',
        'mage/translate',
        'Magestore_Api/js/model/api',
        'materialize'
    ],
    function ($, ko, Component, __, Api) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container/main/api-detail'
            },
            initialize: function () {
                var self = this;
                self._super();
            },
            afterRender: function () {
                $('.collapsible').collapsible();
            }
        });
    }
);
