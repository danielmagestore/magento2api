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
                    var urlParams = self.urlParams();
                    var urlParams = '';
                    var payload = self.payload();
                    var payload = '';
                    var contentType = self.contentType();
                    var requestHeaders = self.requestHeaders();
                    Api.call(url, method, payload, urlParams, '', contentType, requestHeaders);
                }
            },
            afterRender: function () {
                $('select').material_select();
            },
            addHeader: function(){
                var self = this;
                self.requestHeaders.push({key:'',value:''});
            },
            removeHeader: function(header){
                var self = this;
                self.requestHeaders.remove(header);
            },
            addUrlParam: function(){
                var self = this;
                self.urlParams.push({key:'',value:''});
            },
            removeUrlParam: function(urlParam){
                var self = this;
                self.urlParams.remove(urlParam);
            },
            addPayload: function(){
                var self = this;
                self.payload.push({key:'',value:''});
            },
            removePayload: function(payload){
                var self = this;
                self.payload.remove(payload);
            }
        });
    }
);
