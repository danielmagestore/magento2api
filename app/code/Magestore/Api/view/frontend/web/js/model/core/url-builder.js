/*
 *  Copyright © 2016 Magestore. All rights reserved.
 *  See COPYING.txt for license details.
 *
 */

/*jshint browser:true jquery:true*/
/*global alert*/
define(
    ['ko', 'jquery'],
    function(ko, $) {
        return {
            baseUrl: ko.observable(''),
            method: "rest",
            version: 'V1',
            serviceUrl: ':method/:version/',
            createUrl: function(url, params) {
                if(url && url.match("^/")){
                    url = url.substr(1);
                }
                var baseUrl = this.baseUrl();
                if(baseUrl && !baseUrl.match("/$")){
                    baseUrl = baseUrl+'/';
                }
                var completeUrl = this.serviceUrl + url;
                completeUrl = this.bindParams(completeUrl, params);
                if (completeUrl.indexOf(baseUrl) !== -1) {
                    return completeUrl;
                }
                return baseUrl + completeUrl;
            },
            bindParams: function(url, params) {
                params.method = this.method;
                params.version = this.version;

                var urlParts = url.split("/");
                urlParts = urlParts.filter(Boolean);

                $.each(urlParts, function(key, part) {
                    part = part.replace(':', '');
                    if (params[part] != undefined) {
                        urlParts[key] = params[part];
                    }
                });
                return urlParts.join('/');
            }
        };
    }
);
