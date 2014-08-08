var plotControllers = angular.module('gp.plotControllers', ['gp.services.gardens']);

plotControllers.controller('plotListController', ['$scope', 'gp.gardenService', function ($scope, gardenService) {
    $scope.gardens = gardenService.all();
}]);

plotControllers.controller('plotDetailController', ['$scope', 'gp.gardenService', function ($scope, gardenService) {
    $scope.garden = gardenService.currentGarden();
}]);

