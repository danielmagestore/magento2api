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
        'Magestore_Api/js/model/api',
        'events',
        'materialize'
    ],
    function ($, ko, Component, __, Main, Api, Event) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container'
            },
            baseUrl: Main.baseUrl,
            customBaseUrl: Main.customBaseUrl,
            accessType: Main.accessType,
            customAccessToken: Main.customAccessToken,
            baseUrls: Main.baseUrls,
            accessTypes: Main.accessTypes,
            isUseDemo : Main.isUseDemo,
            isLoggedIn : Main.isLoggedIn,
            isGuest : Main.isGuest,
            isCustomAccess : Main.isCustomAccess,
            username : Main.username,
            password : Main.password,
            settingUp : Main.settingUp,
            showRenderingIndicator: Main.showIndicator,
            showContainerIndicator: Api.loading,
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
                Event.observer('copy_data', function(event, data){
                    var $temp = $("<input>");
                    $("body").append($temp);
                    $temp.val(data).select();
                    document.execCommand("copy");
                    $temp.remove();
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
                    if(self.isCustomAccess()){
                        if(!self.customAccessToken()){
                            Event.dispatch('element_invalid', '#custom_access_token');
                            validInformation = false;
                        }else{
                            Event.dispatch('element_valid', '#custom_access_token');
                        }
                    }else{
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
                }
                if(validInformation){
                    Main.start();
                }
            },
            afterRender: function () {
                Event.dispatch(Main.EVENTS.HIDE_INDICATOR, '');
                $('select').material_select();
                $('.tooltipped').tooltip({delay: 50});
            }
        });
    }
);
