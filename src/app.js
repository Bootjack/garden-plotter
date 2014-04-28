var gardenPlotterApp = angular.module('gardenPlotter', ['ngRoute', 'vegetableControllers', 'gardenPlotterFilters']);

gardenPlotterApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/veg', {
            templateUrl: '/vegetable-list.html',
            controller: 'vegetableListController'
        })
        .when('/veg/:vegName', {
            templateUrl: '/vegetable-detail.html',
            controller: 'vegetableDetailController'
        })
        .otherwise({
            redirectTo: '/veg'
        })
}]);

gardenPlotterApp.controller('buildController', ['$scope', function ($scope) {
    $scope.info = {
        name: 'Garden Plotter',
        version: "2.0.0"
    };
}]);
