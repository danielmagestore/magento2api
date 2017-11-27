/*
 * Copyright © 2017 Magestore. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'jquery',
        'Magestore_Api/js/model/core/storage'
    ],
    function ($, storage) {
        "use strict";
        var Request = {
            initialize: function () {
                var self = this;
                return self;
            },
            send: function (url, method, payload, deferred, contentType, requestHeaders) {
                var self = this;
                if (!deferred) {
                    deferred = $.Deferred();
                }
                switch (method) {
                    case 'post':
                        storage.post(
                            url, JSON.stringify(payload), true, contentType, requestHeaders
                        ).done(
                            function (response) {
                                deferred.resolve(response);
                            }
                        ).fail(
                            function (response) {
                                deferred.reject(response);
                            }
                        );
                        break;
                    case 'get':
                        storage.get(
                            url, JSON.stringify(payload), contentType, requestHeaders
                        ).done(
                            function (response) {
                                deferred.resolve(response);
                            }
                        ).fail(
                            function (response) {
                                deferred.reject(response);
                            }
                        );
                        break;
                    case 'delete':
                        url = self.addParamsToUrl(url, payload);
                        storage.delete(
                            url, JSON.stringify(payload), contentType, requestHeaders
                        ).done(
                            function (response) {
                                deferred.resolve(response);
                            }
                        ).fail(
                            function (response) {
                                deferred.reject(response);
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
