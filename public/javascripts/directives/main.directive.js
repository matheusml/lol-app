(function() {
	'use strict';

	angular
		.module('app')
		.directive('main', Main);

	Main.$inject = ['PlayersService', 'RegionsService'];

	function Main(PlayersService, RegionsService) {
		return {
			restrict: 'E',
			scope: {},
			template: [
				'<div class="bs-docs-section">',
					'<div class="row">',
						'<div class="col-lg-4"></div>',
						'<div class="col-lg-4">',
							'<div class="page-header">',
								'<h1>League of Legends Stats</h1>',
							'</div>',
							'<div class="well bs-component">',
								'<form name="form" class="form-horizontal" novalidate ng-submit="vm.search(vm.username.toLowerCase(), vm.region.code)">',
									'<fieldset ng-disabled="vm.loading">',
										'<legend>Select a player</legend>',
										'<div class="form-group">',
											'<label class="col-lg-2 control-label">Username</label>',
											'<div class="col-lg-10">',
												'<input type="text" ng-model="vm.username" autofocus class="form-control" placeholder="Username" required>',
											'</div>',
										'</div>',
										'<div class="form-group">',
											'<label class="col-lg-2 control-label">Region</label>',
											'<div class="col-lg-10">',
												'<select ng-model="vm.region" ng-options="region.label for region in vm.regions" class="form-control">',
												'</select>',
											'</div>',
										'</div>',
										'<div class="form-group">',
											'<div class="col-lg-10 col-lg-offset-2">',
												'<button ng-disabled="form.$invalid" type="submit" class="btn btn-danger">Submit</button>',
											'</div>',
										'</div>',
									'</fieldset>',
								'</form>',
							'</div>',
							'<span ng-if="vm.loading" class="highlight-content">Loading...</span>',
							'<span ng-if="!vm.loading && vm.notFound" class="highlight-content">No results found :(</span>',
							'<player-stats ng-if="!vm.loading && vm.playerStatSummaries.length > 0" player-stat-summaries="vm.playerStatSummaries"></player-stats>',
						'</div>',
					'</div>',
				'</div>',
			].join(''),
			controller: controller,
			controllerAs: 'vm'
		};

		function controller() {
			var vm = this;

			vm.search = search;

			init();

			function init() {
				RegionsService.get().then(function(response) {
					vm.regions = response.data;
					vm.region = vm.regions[0];
				});
			}

			function search(username, region) {
				vm.loading = true;
				vm.notFound = false;
				vm.playerStatSummaries = [];

				PlayersService.getByUsername(username, region).then(function(response) {
					if (response.data && response.data[username]) {
						var playerId = response.data[username].id;
						searchById(playerId, region);
					}
					else {
						vm.notFound = true;
						vm.loading = false;
					}
				});
			}

			function searchById(playerId, region) {
				PlayersService.getById(playerId, region).then(function(response) {
					vm.playerStatSummaries = response.data.playerStatSummaries;
					vm.loading = false;
					if (!vm.playerStatSummaries) {
						vm.notFound = true;
					}
				});
			}
		}
	}
})();
