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
        'Magestore_Api/js/model/api'
    ],
    function ($, ko, Component, __, Event, Api) {
        "use strict";
        return Component.extend({
            showIndicator: Api.loading,
            methods: Api.methods,
            contentTypes: Api.contentTypes,
            requestHeaders: ko.observableArray(),
            urlParams: ko.observableArray(),
            payload: ko.observableArray(),
            method: ko.observable(Api.DEFAULT.METHOD),
            contentType: ko.observable(Api.DEFAULT.CONTENT_TYPE),
            endpoint: ko.observable(''),
            defaults: {
                template: 'Magestore_Api/container/main/api-manager'
            },
            initialize: function () {
                var self = this;
                self._super();
                self.urlParamsJson = ko.pureComputed(function () {
                    var urlParamsJson = '';
                    if(self.urlParams().length > 0){
                        urlParamsJson = {};
                        ko.utils.arrayForEach(self.urlParams(), function(item) {
                            urlParamsJson[item.key()] = item.value();
                        });
                    }
                    return urlParamsJson;
                });
                self.payloadJson = ko.pureComputed(function () {
                    var payloadJson = '';
                    if(self.payload().length > 0){
                        payloadJson = {};
                        ko.utils.arrayForEach(self.payload(), function(item) {
                            payloadJson[item.key()] = item.value();
                        });
                    }
                    return payloadJson;
                });
                self.requestHeadersData = ko.pureComputed(function () {
                    var requestHeadersData = [];
                    if(self.requestHeaders().length > 0){
                        requestHeadersData = [];
                        ko.utils.arrayForEach(self.requestHeaders(), function(item) {
                            requestHeadersData.push({key:item.key(), value:item.value()});
                        });
                    }
                    return requestHeadersData;
                });
            },
            send: function(){
                var self = this;
                var validInformation = true;
                if(!self.endpoint()){
                    Event.dispatch('element_invalid', '#endpoint');
                    validInformation = false;
                }else{
                    Event.dispatch('element_valid', '#endpoint');
                }
                if(validInformation){
                    var url = self.endpoint();
                    var method = self.method();
                    var urlParams = self.urlParamsJson();
                    var payload = self.payloadJson();
                    var contentType = self.contentType();
                    var requestHeaders = self.requestHeaders();
                    Api.call(url, method, payload, urlParams, '', contentType, requestHeaders);
                }
            },
            afterRender: function () {
                $('select').material_select();
                $(".button-collapse").sideNav({
                    menuWidth: 400,
                    edge: 'left',
                    closeOnClick: true,
                    draggable: true,
                    onOpen: function(el) {},
                    onClose: function(el) {},
                });
            },
            addHeader: function(){
                var self = this;
                self.requestHeaders.push({key:ko.observable(),value:ko.observable()});
            },
            removeHeader: function(header){
                var self = this;
                self.requestHeaders.remove(header);
            },
            addUrlParam: function(){
                var self = this;
                self.urlParams.push({key:ko.observable(),value:ko.observable()});
            },
            removeUrlParam: function(urlParam){
                var self = this;
                self.urlParams.remove(urlParam);
            },
            addPayload: function(){
                var self = this;
                self.payload.push({key:ko.observable(),value:ko.observable()});
            },
            removePayload: function(payload){
                var self = this;
                self.payload.remove(payload);
            }
        });
    }
);
