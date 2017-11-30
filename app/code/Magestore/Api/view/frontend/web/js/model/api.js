/*
 * Copyright © 2017 Magestore. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'ko',
        'jquery',
        'request',
        'url-builder'
    ],
    function (ko, $, Request, UrlBuilder) {
        "use strict";
        var Api = {
            loading : ko.observable(true),
            accessToken : ko.observable(''),
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
            call: function (url, method, payload, urlParams, deferred, contentType, requestHeaders) {
                var self = this;
                if(self.loading()){
                    return $.Deferred();
                }
                self.loading(true);
                if(!self.isUrlValid(url)){
                    urlParams = (urlParams)?urlParams:{};
                    url = UrlBuilder.createUrl(url, urlParams);
                }
                requestHeaders = self.addAccessTokenToHeader(requestHeaders);
                var apiRequest = Request.send(url, method, payload, deferred, contentType, requestHeaders);
                apiRequest.done(function(response){
                    if(response){
                        console.log(response);
                    }
                }).always(function(xhr){
                    self.loading(false);
                    if(xhr){
                        console.log(xhr);
                        console.log(xhr.getAllResponseHeaders());
                        console.log(xhr.responseJSON);
                        console.log(xhr.statusText);
                    }
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
