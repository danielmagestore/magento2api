/*
 *  Copyright © 2016 Magestore. All rights reserved.
 *  See COPYING.txt for license details.
 *
 */

define(
    [
        'uiComponent'
    ],
    function (Component) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'Magestore_Api/container/main'
            },
            initialize: function () {
                var self = this;
                self._super();
            }
        });
    }
);
