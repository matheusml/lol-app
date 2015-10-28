describe('main', function() {
	var scope, ctrl, defGetById, defGetByUsername, element, PlayersServiceMock;

	beforeEach(module('app', 'templates'));

	beforeEach(inject(function($rootScope, $compile, $q, PlayersService) {
		defGetById = $q.defer();
		defGetByUsername = $q.defer();

		scope = $rootScope.$new();

		PlayersServiceMock = PlayersService;

		spyOn(PlayersServiceMock, 'getById').and.callFake(function() {
			return defGetById.promise;
		});

		spyOn(PlayersServiceMock, 'getByUsername').and.callFake(function() {
			return defGetByUsername.promise;
		});

		element = '<main></main>';
		element = $compile(element)(scope);

		scope.$digest();

		ctrl = element.controller('main');
	}));
});
