/*
 * Copyright © 2017 Magestore. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'ko',
        'jquery',
        'Magestore_Api/js/model/api',
        'Magestore_Api/js/model/core/local-storage',
        'Magestore_Api/js/model/core/event-manager'
    ],
    function (ko, $, Api, LocalStorage, Event) {
        "use strict";

        var Main = {
            EVENTS: {
                FINISH_SETTING: 'finish_setting'
            },
            demoUrl: ko.observable(window.mapiDemoBaseUrl),
            baseUrl: ko.observable(window.mapiDemoBaseUrl),
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
                Event.observer(self.EVENTS.FINISH_SETTING, function(){
                    $('#mapi_setting_up_indicator').hide();
                });
            },
            /**
             * Start session
             */
            start: function(){
                var self = this;
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
                    if(sessionData.base_url){
                        self.baseUrl(sessionData.base_url);
                    }
                    if(sessionData.access_token){
                        self.accessToken(sessionData.access_token);
                    }
                    self.isLoggedIn(true);
                }else{
                    self.isLoggedIn(false);
                    self.accessToken('');
                    self.baseUrl(window.mapiDemoBaseUrl);
                }
            }
        };
        return Main.initialize();
    }
);
