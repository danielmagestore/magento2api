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
        'Magestore_Api/js/model/main'
    ],
    function ($, ko, Component, __, Main) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container'
            },
            baseUrl: Main.baseUrl,
            baseUrls: ko.observableArray([
                {text: __('Demo'),value: Main.demoUrl()},
                {text: __('Your Site Url'),value:''}
            ]),
            isLoggedIn : Main.isLoggedIn,
            initialize: function () {
                var self = this;
                self._super();
            },
        });
    }
);
