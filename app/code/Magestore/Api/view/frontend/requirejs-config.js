/*
 *  Copyright © 2016 Magestore. All rights reserved.
 *  See COPYING.txt for license details.
 *
 */

var config = {
    paths: {
        'hammerjs': 'Magestore_Api/js/lib/hammer.min',
        'velocity': 'Magestore_Api/js/lib/velocity.min',
        'materialize': 'Magestore_Api/js/lib/materialize',
        'events': 'Magestore_Api/js/model/core/event-manager',
        'local-storage': 'Magestore_Api/js/model/core/local-storage',
        'request': 'Magestore_Api/js/model/core/request',
        'url-builder': 'Magestore_Api/js/model/core/url-builder'
    },
    shim: {
        'materialize': {
            deps: ['jquery', 'hammerjs', 'velocity']
        }
    }
};
