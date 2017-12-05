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
                    var xhr = self.xhr();
                    var responseText = '';
                    if(xhr){
                        responseText = xhr.responseText;
                        if(xhr.responseJSON){
                            responseText = JSON.stringify(xhr.responseJSON, undefined, 4);
                        }
                    }
                    return responseText;
                });
                self.trace = ko.pureComputed(function(){
                    var xhr = self.xhr();
                    var trace = '';
                    if(xhr){
                        if(xhr.responseJSON){
                            var response = xhr.responseJSON;
                            if(response.trace){
                                trace = response.trace;
                            }
                        }
                    }
                    return trace;
                });
                self.responseHeaders = ko.pureComputed(function(){
                    return (self.xhr())?self.xhr().getAllResponseHeaders():'';
                });
                self.xhr.subscribe(function(xhr){
                    if(xhr){
                        self.processResponseStatus(xhr);
                        self.processResponseJson(xhr);
                    }
                });
                return self;
            },
            processResponseStatus: function(xhr){
                var self = this;
                if(xhr.status == 0){
                    var message = "Javascript returned an HTTP 0 error. One common reason this might happen is that you requested a cross-domain resource from a server that did not include the appropriate CORS headers in the response. You can view detail in the Console tab of your browser developer tools.";
                    Materialize.toast(message, 10000);
                }
            },
            processResponseJson: function(xhr){
                var self = this;
                if(xhr.responseJSON){
                    var response = xhr.responseJSON;
                    if(response.message){
                        var message = response.message;
                        if(response.parameters){
                            $.each(response.parameters, function(key, value){
                                var regex = new RegExp('%'+key,"g");
                                message = message.replace(regex, value);
                            });
                        }
                        Materialize.toast(message, 3000);
                    }
                }
            }
        };
        return ApiResponse.initialize();
    }
);
