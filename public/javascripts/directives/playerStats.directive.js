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
            template: [
                '<div ng-repeat="summary in vm.playerStatSummaries" class="list-group">',
                    '<div class="list-group-item">',
                        '<h4 class="list-group-item-heading">{{summary.playerStatSummaryType}}',
                            '<span class="label label-success">wins: {{summary.wins}}</span>',
                        '</h4>',
                        '<p class="list-group-item-text">Champions Kills: ',
                            '<span class="badge">{{summary.aggregatedStats.totalChampionKills}}</span>',
                        '</p>',
                        '<p class="list-group-item-text">Total Assists: ',
                            '<span class="badge">{{summary.aggregatedStats.totalAssists}}</span>',
                        '</p>',
                        '<p class="list-group-item-text">Minions Kills: ',
                            '<span class="badge">{{summary.aggregatedStats.totalMinionKills}}</span>',
                        '</p>',
                    '</div>',
                '</div>',
            ].join(''),
            controller: controller,
            controllerAs: 'vm'
        };

        function controller($scope) {
            var vm = this;

            vm.playerStatSummaries = $scope.playerStatSummaries;
        }
    }
})();
