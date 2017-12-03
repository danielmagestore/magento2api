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
                self.xhr.subscribe(function(xhr){
                    if(xhr && (xhr.status == 0)){
                        var message = "Javascript returned an HTTP 0 error. One common reason this might happen is that you requested a cross-domain resource from a server that did not include the appropriate CORS headers in the response. You can view detail in the Console tab of your browser developer tools.";
                        Materialize.toast(message, 10000);
                    }
                });
                return self;
            },
        };
        return ApiResponse.initialize();
    }
);
