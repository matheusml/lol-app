(function() {
	'use strict';

	angular
		.module('app')
		.directive('usernameStats', UsernameStats);

	function UsernameStats() {
		return {
			restrict: 'E',
			scope: {},
			template: [
				'<div class="well bs-component">',
					'<form class="form-horizontal">',
						'<fieldset>',
							'<legend>Select a player</legend>',
							'<div class="form-group">',
								'<label class="col-lg-2 control-label">Username</label>',
								'<div class="col-lg-10">',
									'<input type="text" ng-model="vm.username" autofocus class="form-control" placeholder="Username">',
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
									'<button type="submit" class="btn btn-danger">Submit</button>',
								'</div>',
							'</div>',
						'</fieldset>',
					'</form>',
				'</div>',
			].join(''),
			controller: controller,
			controllerAs: 'vm'
		};

		function controller() {
			var vm = this;

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
				{ label: 'Turkey', code: 'tr' }
			];

			vm.region = vm.regions[0];
		}
	}
})();
