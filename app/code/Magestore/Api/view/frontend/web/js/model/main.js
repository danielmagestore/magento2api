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
                {text: __('Guest'),value:''},
                {text: __('Already have token?'),value:'custom'}
            ]),
            demoUrl: ko.observable(window.mapiDemoBaseUrl),
            baseUrl: ko.observable(window.mapiDemoBaseUrl),
            customBaseUrl: ko.observable(''),
            showIndicator : ko.observable(true),
            isLoggedIn : ko.observable(false),
            accessType : ko.observable(''),
            customAccessToken : ko.observable(''),
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
                self.isCustomAccess = ko.pureComputed(function(){
                    return (self.accessType() == 'custom')?true:false;
                });
                self.sessionDetail = ko.pureComputed(function(){
                    var data = [
                        {label:'Base Url', value:Api.getBaseUrl(), copyAble:true},
                    ];
                    if(!self.isGuest()){
                        if(self.isCustomAccess()){
                            data.push({label:'Token', value:Api.accessToken(), copyAble:true});
                        }else{
                            var tokenType = ko.utils.arrayFirst(self.accessTypes(), function(item) {
                                return (item.value == self.accessType());
                            });
                            data.push({label:'User', value:self.username()});
                            data.push({label:'Token', value:Api.accessToken(), copyAble:true});
                            data.push({label:'Token Type', value:tokenType.text});
                        }
                    }else{
                        data.push({label:'User', value: __('Guest')});
                    }
                    if(self.isUseDemo() && (self.accessType() == 'admin')){
                        data.push({label:'Note', value: __("Demo access has limited permission. Need more? Contact me!")});
                    }
                    return data;
                });
                self.isUseDemo.subscribe(function(){
                    self.autoFillDemoAccount();
                });
                self.accessType.subscribe(function(){
                    self.autoFillDemoAccount();
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
                    Api.crossDomain(false);
                }else{
                    Api.setBaseUrl(self.customBaseUrl());
                    Api.crossDomain(true);
                }
                if(!self.isLoggedIn() && !self.isGuest() && !self.isCustomAccess()){
                    var url = "integration/"+self.accessType()+"/token";
                    var payload = {
                        username: self.username(),
                        password: self.password()
                    };
                    var apiRequest = Api.call(url, 'post', payload);
                    apiRequest.done(function(response){
                        if(response){
                            self.isLoggedIn(true);
                            Api.accessToken(response);
                            self.saveSession();
                        }
                    });
                }else{
                    if(self.isCustomAccess()){
                        Api.accessToken(self.customAccessToken());
                    }
                    self.isLoggedIn(true);
                }
            },
            /**
             * Close session
             */
            finish: function(){
                var self = this;
                LocalStorage.save('session_data', '');
                window.location.reload();
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
                        Api.setBaseUrl(sessionData.base_url);
                    }
                    if(sessionData.custom_base_url){
                        self.customBaseUrl(sessionData.custom_base_url);
                    }
                    if(sessionData.username){
                        self.username(sessionData.username);
                    }
                    if(sessionData.access_type){
                        self.accessType(sessionData.access_type);
                    }
                    if(sessionData.access_token){
                        Api.accessToken(sessionData.access_token);
                        if(self.isCustomAccess()){
                            self.customAccessToken(sessionData.access_token);
                        }
                    }
                    self.isLoggedIn(true);
                }else{
                    self.isLoggedIn(false);
                    self.baseUrl(window.mapiDemoBaseUrl);
                    self.customBaseUrl('');
                    self.accessType('');
                    self.customAccessToken('');
                    Api.accessToken('');
                    Api.setBaseUrl('');
                }
                Api.crossDomain((self.isUseDemo())?false:true);
            },
            /**
             * Save logged in session
             */
            saveSession: function(){
                var self = this;
                var sessionData = {
                    base_url: self.baseUrl(),
                    custom_base_url: self.customBaseUrl(),
                    username: self.username(),
                    access_type: self.accessType(),
                    access_token: Api.accessToken()
                };
                LocalStorage.save('session_data', JSON.stringify(sessionData));
            },
            /**
             * Auto fill demo account
             */
            autoFillDemoAccount: function(){
                var self = this;
                if(self.isUseDemo()){
                    switch (self.accessType()){
                        case 'admin':
                            self.username("demo");
                            self.password("demo123");
                            break;
                        case 'customer':
                            self.username("roni_cost@example.com");
                            self.password("roni_cost3@example.com");
                            break;
                        case 'guest':
                            self.username("");
                            self.password("");
                            break;
                    }
                }else{
                    self.username("");
                    self.password("");
                }
                if(Materialize){
                    Materialize.updateTextFields();
                }
            }
        };
        return Main.initialize();
    }
);
