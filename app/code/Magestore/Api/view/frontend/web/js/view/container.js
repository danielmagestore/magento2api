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
            accessType: Main.accessType,
            baseUrls: ko.observableArray([
                {text: __('Demo'),value: Main.demoUrl()},
                {text: __('Your Site Url'),value:''}
            ]),
            accessTypes: ko.observableArray([
                {text: __('Admin'),value: 'admin'},
                {text: __('Customer'),value:'customer'},
                {text: __('Guest'),value:''}
            ]),
            isUseDemo : Main.isUseDemo,
            isLoggedIn : Main.isLoggedIn,
            isGuest : Main.isGuest,
            initialize: function () {
                var self = this;
                self._super();
            },
            start: function(){
                Main.start();
            }
        });
    }
);
