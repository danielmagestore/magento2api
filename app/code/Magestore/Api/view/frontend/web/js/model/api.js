/*
 * Copyright © 2017 Magestore. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'ko',
        'jquery',
        'mage/translate',
        'request',
        'url-builder',
        'Magestore_Api/js/model/api/detail',
        'Magestore_Api/js/model/api/search-criteria-builder'
    ],
    function (ko, $, __, Request, UrlBuilder, ApiDetail, SearchCriteriaBuilder) {
        "use strict";

        var Api = {
            DEFAULT: {
                METHOD:'post',
                CONTENT_TYPE:'application/json'
            },
            loading : ko.observable(false),
            crossDomain : ko.observable(false),
            accessToken : ko.observable(''),
            methods: ko.observableArray([
                {text: __('Post'),value: 'post'},
                {text: __('Get'),value:'get'},
                {text: __('Delete'),value:'delete'}
            ]),
            contentTypes: ko.observableArray([
                {text: __('JSON'),value: 'application/json'},
                {text: __('XML'),value:'application/xml'}
            ]),
            initialize: function () {
                var self = this;
                return self;
            },
            getBaseUrl: function(){
                return UrlBuilder.baseUrl();
            },
            setBaseUrl: function(baseUrl){
                UrlBuilder.baseUrl(baseUrl);
            },
            call: function (url, method, payload, urlParams, deferred, contentType, requestHeaders, crossDomain) {
                var self = this;
                if(self.loading()){
                    return (deferred)?deferred:$.Deferred();
                }
                crossDomain = (typeof crossDomain != 'undefined')?crossDomain:self.crossDomain();
                ApiDetail.xhr('');
                ApiDetail.url('');
                self.loading(true);
                if(!self.isUrlValid(url)){
                    urlParams = (urlParams)?urlParams:{};
                    url = UrlBuilder.createUrl(url, urlParams);
                }
                url = SearchCriteriaBuilder.addToUrl(url);
                requestHeaders = self.addAccessTokenToHeader(requestHeaders);
                var apiRequest = Request.send(url, method, payload, deferred, contentType, requestHeaders, crossDomain);
                apiRequest.done(function(response, textStatus, xhr){
                    if(xhr){
                        ApiDetail.xhr(xhr);
                    }
                }).fail(function(xhr, textStatus, errorThrown){
                    if(xhr){
                        ApiDetail.xhr(xhr);
                    }
                }).always(function(){
                    ApiDetail.url(url);
                    self.loading(false);
                });
                return apiRequest;
            },
            isUrlValid: function(url) {
                return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
            },
            addAccessTokenToHeader: function (requestHeaders) {
                var self = this;
                if(self.accessToken()){
                    var authorization = "Bearer "+self.accessToken();
                    requestHeaders = ($.isArray(requestHeaders))?requestHeaders:[];
                    if(requestHeaders.legnth > 0){
                        $.each(requestHeaders, function(index, header){
                            if(header.key == 'Authorization'){
                                header.value = authorization;
                            }
                        });
                    }else{
                        requestHeaders.push({
                            key:'Authorization',
                            value:authorization
                        });
                    }
                }
                return requestHeaders;
            }
        };
        return Api.initialize();
    }
);
