'use strict';

// Edited by CPang (Test 2 note version)
angular.module('app').factory('Version', function($resource) {
    return $resource('/api/version/:id', {}, {
        update: {
            method: 'PUT',
        },
    });
});
