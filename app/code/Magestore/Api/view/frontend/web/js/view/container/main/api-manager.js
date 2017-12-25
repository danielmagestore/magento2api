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
        'Magestore_Api/js/model/api',
        'Magestore_Api/js/model/api/search-criteria-builder'
    ],
    function ($, ko, Component, __, Event, Api, SearchCriteriaBuilder) {
        "use strict";
        return Component.extend({
            methods: Api.methods,
            contentTypes: Api.contentTypes,
            requestHeaders: ko.observableArray(),
            urlParams: ko.observableArray(),
            payload: ko.observableArray(),
            method: ko.observable(Api.DEFAULT.METHOD),
            contentType: ko.observable(Api.DEFAULT.CONTENT_TYPE),
            endpoint: ko.observable(''),
            pageSize: SearchCriteriaBuilder.pageSize,
            currentPage: SearchCriteriaBuilder.currentPage,
            directions: SearchCriteriaBuilder.directions,
            conditionTypes: SearchCriteriaBuilder.conditionTypes,
            filterGroups: SearchCriteriaBuilder.filterGroups,
            sortOrders: SearchCriteriaBuilder.sortOrders,
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
                            if(typeof item.key() != 'undefined'){
                                urlParamsJson[item.key()] = item.value();
                            }
                        });
                    }
                    return urlParamsJson;
                });
                self.payloadJson = ko.pureComputed(function () {
                    var payloadJson = '';
                    if(self.payload().length > 0){
                        payloadJson = {};
                        ko.utils.arrayForEach(self.payload(), function(item) {
                            if(typeof item.key() != 'undefined') {
                                payloadJson[item.key()] = item.value();
                            }
                        });
                    }
                    return payloadJson;
                });
                self.requestHeadersData = ko.pureComputed(function () {
                    var requestHeadersData = [];
                    if(self.requestHeaders().length > 0){
                        requestHeadersData = [];
                        ko.utils.arrayForEach(self.requestHeaders(), function(item) {
                            if(typeof item.key() != 'undefined') {
                                requestHeadersData.push({key: item.key(), value: item.value()});
                            }
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
                    var requestHeaders = self.requestHeadersData();
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
                $('.tooltipped').tooltip({delay: 50});
            },
            renderSelectElement: function(){
                $('select').material_select();
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
            },
            addFilterGroup: function(){
                var self = this;
                self.filterGroups.push({filters:ko.observableArray(
                    [{field:ko.observable(),value:ko.observable(),condition_type:ko.observable("eq")}]
                )});
            },
            removeFilterGroup: function(filterGroup){
                var self = this;
                self.filterGroups.remove(filterGroup);
            },
            addFilter: function(filterGroup){
                var self = this;
                if(filterGroup && filterGroup.filters){
                    filterGroup.filters.push({field:ko.observable(),value:ko.observable(),condition_type:ko.observable("eq")});
                }
            },
            removeFilter: function(filterGroup, filter){
                var self = this;
                if(filterGroup && filter && filterGroup.filters){
                    filterGroup.filters.remove(filter);
                    if(filterGroup.filters().length == 0){
                        self.filterGroups.remove(filterGroup);
                    }
                }
            },
            addSortOrder: function(){
                var self = this;
                self.sortOrders.push({field:ko.observable(),direction:ko.observable()});
            },
            removeSortOrder: function(sortOrder){
                var self = this;
                self.sortOrders.remove(sortOrder);
            }
        });
    }
);
