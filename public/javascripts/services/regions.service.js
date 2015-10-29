(function() {
    'use strict';

    angular
        .module('app')
        .service('RegionsService', RegionsService);

    RegionsService.$inject = ['$http'];

    function RegionsService($http) {
        this.get = function() {
            return $http.get('/regions');
        };
    }
})();
