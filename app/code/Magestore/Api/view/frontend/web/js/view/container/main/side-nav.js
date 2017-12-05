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
        'events',
        'Magestore_Api/js/model/main'
    ],
    function ($, ko, Component, __, Event, Main) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container/main/side-nav'
            },
            sessionDetail: Main.sessionDetail,
            initialize: function () {
                var self = this;
                self._super();
            },
            afterRender: function () {
                $(".button-collapse").sideNav({
                    menuWidth: 400,
                    edge: 'left',
                    closeOnClick: true,
                    draggable: true,
                    onOpen: function(el) {},
                    onClose: function(el) {},
                });
                $('.tooltipped').tooltip({delay: 50});
            },
            clearSession: function () {
                $('.button-collapse').sideNav('hide');
                Main.finish();
            },
            copySessionData: function (sessionData) {
                if (sessionData) {
                    Event.dispatch('copy_data', sessionData.value);
                    var message = "Copied to clipboard";
                    Materialize.toast(message, 1000);
                }
            }
        });
    }
);
