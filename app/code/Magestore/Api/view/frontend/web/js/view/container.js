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
        'mage/translate'
    ],
    function ($, ko, Component, __) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container'
            },
            initialize: function () {
                this._super();
            }
        });
    }
);
