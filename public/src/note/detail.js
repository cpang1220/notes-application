'use strict';

// Edited by CPang (Test 2 note version)
angular.module('app').component('noteDetail', {
    templateUrl: '/src/note/detail.html',
    bindings: {
        session: '<',
        note: '<',
        versions: '<',
    },
    controller: function($scope) {
        this.$onInit = function() {
            $scope.items = this.versions;
            $scope.selectedVersion = $scope.items[0];
        };
    },
});
