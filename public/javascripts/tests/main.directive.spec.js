describe('main', function() {
	var scope, vm, defGet, defGetById, defGetByUsername, element, PlayersServiceMock, RegionsServiceMock;

	beforeEach(module('app'));

	beforeEach(inject(function($rootScope, $compile, $q, PlayersService, RegionsService) {
		defGet = $q.defer();
		defGetById = $q.defer();
		defGetByUsername = $q.defer();

		scope = $rootScope.$new();

		PlayersServiceMock = PlayersService;
		RegionsServiceMock = RegionsService;

		spyOn(RegionsServiceMock, 'get').and.callFake(function() {
			return defGet.promise;
		});

		spyOn(PlayersServiceMock, 'getById').and.callFake(function() {
			return defGetById.promise;
		});

		spyOn(PlayersServiceMock, 'getByUsername').and.callFake(function() {
			return defGetByUsername.promise;
		});

		element = '<main></main>';
		element = $compile(element)(scope);

		scope.$digest();

		vm = element.controller('main');
	}));

	describe('init', function() {
		it('invokes get regions', function() {
			expect(RegionsServiceMock.get).toHaveBeenCalledWith();
		});

		describe('after the promise is solved', function() {
			beforeEach(function() {
				defGet.resolve({ data: ['region1', 'region2'] });
				scope.$apply();
			});

			it('updates regions list', function() {
				expect(vm.regions).toEqual(['region1', 'region2']);
			});

			it('updates region with the first value of the list', function() {
				expect(vm.region).toEqual('region1');
			});
		});
	});

	describe('search', function() {
		beforeEach(function() {
			vm.search('username', 'region');
		});

		it('updates loading', function() {
			expect(vm.loading).toBe(true);
		});

		it('updates notFound', function() {
			expect(vm.notFound).toBe(false);
		});

		it('updates playerStatSummaries', function() {
			expect(vm.playerStatSummaries).toEqual([]);
		});

		it('invokes getByUsername', function() {
			expect(PlayersServiceMock.getByUsername).toHaveBeenCalledWith('username', 'region');
		});

		describe('after getByUsername promise is rejected', function() {
			beforeEach(function() {
				defGetByUsername.resolve({data: {}});
				scope.$apply();
			});

			it('doesnt invoke getById', function() {
				expect(PlayersServiceMock.getById).not.toHaveBeenCalled();
			});

			it('updates notFound', function() {
				expect(vm.notFound).toEqual(true);
			});

			it('updates loading', function() {
				expect(vm.loading).toEqual(false);
			});
		});

		describe('after getByUsername promise is solved', function() {
			beforeEach(function() {
				defGetByUsername.resolve({data: {username: {id: 42} }});
				scope.$apply();
			});

			it('invokes getById', function() {
				expect(PlayersServiceMock.getById).toHaveBeenCalledWith(42, 'region');
			});

			describe('after getById is solved', function() {
				beforeEach(function() {
					defGetById.resolve({data: {playerStatSummaries: [1,2,3]}});
					scope.$apply();
				});

				it('updates loading', function() {
					expect(vm.loading).toBe(false);
				});

				it('updates playerStatSummaries', function() {
					expect(vm.playerStatSummaries).toEqual([1, 2, 3]);
				});

				it('doesnt update notFound', function() {
					expect(vm.notFound).toBe(false);
				});
			});
		});
	});
});
