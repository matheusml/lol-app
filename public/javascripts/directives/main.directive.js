(function() {
	'use strict';

	angular
		.module('app')
		.directive('main', Main);

	Main.$inject = ['PlayersService'];

	function Main(PlayersService) {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: '/javascripts/directives/main.html',
			controller: controller,
			controllerAs: 'vm'
		};

		function controller() {
			var vm = this;

			vm.search = search;

			init();

			function init() {
				vm.regions = [
					{ label: 'North America', code: 'na' },
					{ label: 'Brazil', code: 'br' },
					{ label: 'Europe North & East', code: 'eune' },
					{ label: 'Europe West', code: 'euw' },
					{ label: 'Korea', code: 'kr' },
					{ label: 'Latin America North', code: 'lan' },
					{ label: 'Latin America South', code: 'las' },
					{ label: 'Oceania', code: 'oce' },
					{ label: 'Russia', code: 'ru' },
					{ label: 'Turkey', code: 'tr' },
				];

				vm.region = vm.regions[0];
			}

			function search(username, region) {
				PlayersService.getByUsername(username, region).then(function(response) {
					var playerId = response.data[username].id;
					PlayersService.getById(playerId, region).then(function(response) {
						vm.playerStatSummaries = response.data.playerStatSummaries;
					});
				});
			}
		}
	}
})();
