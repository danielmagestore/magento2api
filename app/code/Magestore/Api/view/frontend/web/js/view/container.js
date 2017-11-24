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
        'Magestore_Api/js/model/request'
    ],
    function ($, ko, Component, __, Request) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container'
            },
            username: ko.observable(),
            password: ko.observable(),
            token: ko.observable(),
            apiRoute: ko.observable(),
            response: ko.observable(),
            initialize: function () {
                this._super();
            },
            getToken: function(){
                var self = this;
                var params = {
                    username:self.username(),
                    password:self.password()
                };
                var url = 'https://devm2.magentovn.com/rest/V1/integration/admin/token';
                var apiRequest = Request.send(url, 'post', params)
                apiRequest.done(function(token){
                    if(token){
                        self.token(token);
                    }
                });
            },
            callApi: function(){
                var self = this;
                var params = {
                };
                var url = 'https://devm2.magentovn.com/rest/V1/'+self.apiRoute();
                var apiRequest = Request.send(url, 'get', params)
                apiRequest.done(function(response){
                    if(response){
                        self.response(response);
                    }
                });
            },
        });
    }
);
