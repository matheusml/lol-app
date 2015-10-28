(function() {
	'use strict';

	angular
		.module('app')
		.directive('playerStats', PlayerStats);

	function PlayerStats() {
		return {
			restrict: 'E',
			scope: {
				playerStatSummaries: '='
			},
			templateUrl: '/javascripts/directives/playerStats.html',
			controller: controller,
			controllerAs: 'vm'
		};

		function controller($scope) {
			var vm = this;

			vm.playerStatSummaries = $scope.playerStatSummaries;
		}
	}
})();
