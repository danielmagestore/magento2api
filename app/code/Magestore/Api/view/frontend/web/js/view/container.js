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
        'Magestore_Api/js/model/main',
        'events'
    ],
    function ($, ko, Component, __, Main, Event) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container'
            },
            baseUrl: Main.baseUrl,
            customBaseUrl: Main.customBaseUrl,
            accessType: Main.accessType,
            baseUrls: Main.baseUrls,
            accessTypes: Main.accessTypes,
            isUseDemo : Main.isUseDemo,
            isLoggedIn : Main.isLoggedIn,
            isGuest : Main.isGuest,
            username : Main.username,
            password : Main.password,
            settingUp : Main.settingUp,
            showIndicator: Main.showIndicator,
            initialize: function () {
                var self = this;
                self._super();
                self.initEvents();
            },
            initEvents: function(){
                var self = this;
                Event.observer('element_valid', function(event, elementSelector){
                    if($(elementSelector)){
                        $(elementSelector).addClass('valid');
                        $(elementSelector).removeClass('invalid');
                    }
                });
                Event.observer('element_invalid', function(event, elementSelector){
                    if($(elementSelector)){
                        $(elementSelector).addClass('invalid');
                        $(elementSelector).removeClass('valid');
                    }
                });
            },
            start: function(){
                var self = this;
                var validInformation = true;
                if(!self.isUseDemo()){
                    if(!self.customBaseUrl()){
                        Event.dispatch('element_invalid', '#base_url');
                        validInformation = false;
                    }else{
                        Event.dispatch('element_valid', '#base_url');
                    }
                }
                if(!self.isGuest()){
                    if(!self.username()){
                        Event.dispatch('element_invalid', '#username');
                        validInformation = false;
                    }else{
                        Event.dispatch('element_valid', '#username');
                    }
                    if(!self.password()){
                        Event.dispatch('element_invalid', '#password');
                        validInformation = false;
                    }else{
                        Event.dispatch('element_valid', '#password');
                    }
                }
                if(validInformation){
                    Main.start();
                }
            },
            afterRender: function () {
                Event.dispatch(Main.EVENTS.HIDE_INDICATOR, '');
                $('select').material_select();
            }
        });
    }
);
