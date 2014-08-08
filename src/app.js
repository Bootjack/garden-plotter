var gardenPlotterApp = angular.module('gardenPlotter', [
    'ngRoute', 
    'gp.vegetableControllers', 
    'gp.plotControllers', 
    'gp.dateFilters', 
    'gp.services.dialogs'
]);

gardenPlotterApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/veg', {
            templateUrl: '/welcome.html'
        })
        .when('/veg/:vegName', {
            templateUrl: '/vegetable-detail.html',
            controller: 'vegetableDetailController'
        })
        .otherwise({
            redirectTo: '/veg'
        });
}]);

gardenPlotterApp.controller('buildController', ['$scope', function ($scope) {
    $scope.info = {
        name: 'Garden Plotter',
        version: "2.0.0"
    };
}]);
