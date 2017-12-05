/*
 * Copyright © 2017 Magestore. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'ko',
        'jquery',
        'Magestore_Api/js/model/core/storage'
    ],
    function (ko, $, storage) {
        "use strict";
        var Request = {
            initialize: function () {
                var self = this;
                return self;
            },
            send: function (url, method, payload, deferred, contentType, requestHeaders, crossDomain) {
                var self = this;
                if (!deferred) {
                    deferred = $.Deferred();
                }
                if($.isArray(requestHeaders)){
                    requestHeaders = ko.utils.arrayFilter(requestHeaders, function (header) {
                        return (header.key);
                    });
                }
                switch (method) {
                    case 'post':
                        storage.post(
                            url, JSON.stringify(payload), true, contentType, requestHeaders, crossDomain
                        ).done(
                            function (response, textStatus, xhr) {
                                deferred.resolve(response, textStatus, xhr);
                            }
                        ).fail(
                            function (xhr, textStatus, errorThrown) {
                                deferred.reject(xhr, textStatus, errorThrown);
                            }
                        );
                        break;
                    case 'get':
                        storage.get(
                            url, JSON.stringify(payload), contentType, requestHeaders, crossDomain
                        ).done(
                            function (response, textStatus, xhr) {
                                deferred.resolve(response, textStatus, xhr);
                            }
                        ).fail(
                            function (xhr, textStatus, errorThrown) {
                                deferred.reject(xhr, textStatus, errorThrown);
                            }
                        );
                        break;
                    case 'delete':
                        url = self.addParamsToUrl(url, payload);
                        storage.delete(
                            url, JSON.stringify(payload), contentType, requestHeaders, crossDomain
                        ).done(
                            function (response, textStatus, xhr) {
                                deferred.resolve(response, textStatus, xhr);
                            }
                        ).fail(
                            function (xhr, textStatus, errorThrown) {
                                deferred.reject(xhr, textStatus, errorThrown);
                            }
                        );
                        break;
                    default:
                        break;
                }
                return deferred;
            },
            addParamsToUrl: function(url, params){
                $.each(params, function(key, value){
                    if(key){
                        if (url.indexOf("?") != -1) {
                            url = url + '&'+key+'=' + value;
                        }
                        else {
                            url = url + '?'+key+'=' + value;
                        }
                    }
                });
                return url;
            }
        };
        return Request.initialize();
    }
);
