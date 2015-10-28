(function() {
	'use strict';

	angular
		.module('app')
		.service('PlayersService', PlayersService);

	PlayersService.$inject = ['$http'];

	function PlayersService($http) {
		this.getByUsername = function(username, region) {
			return $http.get('/players/username/' + username + '/regions/' + region);
		};

		this.getById = function(id, region) {
			return $http.get('/players/' + id + '/regions/' + region);
		};
	}
})();
