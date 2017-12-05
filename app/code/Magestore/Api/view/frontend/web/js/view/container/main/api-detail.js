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
        'Magestore_Api/js/model/api/detail'
    ],
    function ($, ko, Component, __, ApiDetail) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container/main/api-detail'
            },
            statusHeader:  ko.pureComputed(function(){
                return (ApiDetail.statusCode())?__('Status')+' - '+ApiDetail.statusCode():__('Status');
            }),
            statusDetail:  ko.pureComputed(function(){
                return (ApiDetail.statusCode())?ApiDetail.statusCode()+' - '+ApiDetail.statusText():'';
            }),
            url: ApiDetail.url,
            responseText: ApiDetail.responseText,
            trace: ApiDetail.trace,
            responseHeaders: ApiDetail.responseHeaders,
            initialize: function () {
                var self = this;
                self._super();
            },
            afterRender: function () {
                $('.collapsible').collapsible();
            }
        });
    }
);
