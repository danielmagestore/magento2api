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
        'Magestore_Api/js/model/api'
    ],
    function ($, ko, Component, __, Api) {
        "use strict";
        return Component.extend({
            showIndicator: Api.loading,
            defaults: {
                template: 'Magestore_Api/container/main/api-manager'
            },
            initialize: function () {
                var self = this;
                self._super();
            },
        });
    }
);
