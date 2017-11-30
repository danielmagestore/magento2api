/*
 * Copyright © 2017 Magestore. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'ko',
        'jquery',
        'Magestore_Api/js/model/api',
        'local-storage',
        'events',
        'mage/translate'
    ],
    function (ko, $, Api, LocalStorage, Event, __) {
        "use strict";

        var Main = {
            EVENTS: {
                SHOW_INDICATOR: 'show_indicator',
                HIDE_INDICATOR: 'hide_indicator'
            },
            baseUrls: ko.observableArray([
                {text: __('Demo'),value: window.mapiDemoBaseUrl},
                {text: __('Your Site Url'),value:''}
            ]),
            accessTypes: ko.observableArray([
                {text: __('Admin'),value: 'admin'},
                {text: __('Customer'),value:'customer'},
                {text: __('Guest'),value:''}
            ]),
            demoUrl: ko.observable(window.mapiDemoBaseUrl),
            baseUrl: ko.observable(window.mapiDemoBaseUrl),
            customBaseUrl: ko.observable(''),
            showIndicator : ko.observable(true),
            isLoggedIn : ko.observable(false),
            accessToken : ko.observable(''),
            accessType : ko.observable(''),
            username : ko.observable(''),
            password : ko.observable(''),
            /**
             * Initialize
             * @returns {Main}
             */
            initialize: function () {
                var self = this;
                self.isUseDemo = ko.pureComputed(function(){
                    return (self.baseUrl() == self.demoUrl())?true:false;
                });
                self.isGuest = ko.pureComputed(function(){
                    return (self.accessType() == '')?true:false;
                });
                self.initSession();
                self.initEvents();
                return self;
            },
            /**
             * Init events
             */
            initEvents: function(){
                var self = this;
                Event.observer(self.EVENTS.HIDE_INDICATOR, function(){
                    self.showIndicator(false);
                });
                Event.observer(self.EVENTS.SHOW_INDICATOR, function(){
                    self.showIndicator(true);
                });
            },
            /**
             * Start session
             */
            start: function(){
                var self = this;
                if(self.isUseDemo()){
                    Api.setBaseUrl(self.demoUrl());
                }else{
                    Api.setBaseUrl(self.customBaseUrl());
                }
                if(!self.isLoggedIn() && !self.isGuest()){
                    var url = "integration/"+self.accessType()+"/token";
                    var payload = {
                        username: self.username(),
                        password: self.password(),
                    };
                    var apiRequest = Api.call(url, 'post', payload);
                    apiRequest.done(function(response){
                        if(response){
                            console.log(response);
                            self.isLoggedIn(true);
                            self.accessToken(response);
                            self.saveSession();
                        }
                    }).always(function(xhr){
                        if(xhr){
                            console.log(xhr);
                            console.log(xhr.getAllResponseHeaders());
                            console.log(xhr.responseJSON);
                            console.log(xhr.statusText);
                        }
                    });
                }else{
                    self.isLoggedIn(true);
                }
            },
            /**
             * Close session
             */
            finish: function(){
                var self = this;
                LocalStorage.save('session_data', '');
                self.initSession();
            },
            /**
             * Init logged in session
             */
            initSession: function(){
                var self = this;
                var sessionData = LocalStorage.get('session_data');
                if(sessionData){
                    sessionData = JSON.parse(sessionData);
                    if(sessionData.base_url){
                        self.baseUrl(sessionData.base_url);
                    }
                    if(sessionData.custom_base_url){
                        self.customBaseUrl(sessionData.custom_base_url);
                    }
                    if(sessionData.access_token){
                        self.accessToken(sessionData.access_token);
                    }
                    console.log(sessionData);
                    self.isLoggedIn(true);
                }else{
                    self.isLoggedIn(false);
                    self.accessToken('');
                    self.baseUrl(window.mapiDemoBaseUrl);
                    self.customBaseUrl('');
                }
            },
            /**
             * Save logged in session
             */
            saveSession: function(){
                var self = this;
                var sessionData = {
                    base_url: self.baseUrl(),
                    custom_base_url: self.customBaseUrl(),
                    access_token: self.accessToken()
                };
                LocalStorage.save('session_data', JSON.stringify(sessionData));
            }
        };
        return Main.initialize();
    }
);
