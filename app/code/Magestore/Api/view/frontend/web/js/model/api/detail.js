/*
 * Copyright © 2017 Magestore. All rights reserved.
 * See COPYING.txt for license details.
 */

define(
    [
        'ko',
        'jquery'
    ],
    function (ko, $) {
        "use strict";

        var ApiResponse = {
            /**
             * String URL
             */
            url: ko.observable(),
            /**
             * XMLHttpRequest
             */
            xhr: ko.observable(),
            /**
             * Initialize
             * @returns {ApiResponse}
             */
            initialize: function () {
                var self = this;
                self.statusCode = ko.pureComputed(function(){
                    return (self.xhr())?self.xhr().status:'';
                });
                self.statusText = ko.pureComputed(function(){
                    return (self.xhr())?self.xhr().statusText:'';
                });
                self.responseText = ko.pureComputed(function(){
                    return (self.xhr())?self.xhr().responseText:'';
                });
                self.responseHeaders = ko.pureComputed(function(){
                    return (self.xhr())?self.xhr().getAllResponseHeaders():'';
                });
                return self;
            },
        };
        return ApiResponse.initialize();
    }
);
