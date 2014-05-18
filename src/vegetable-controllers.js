var vegetableControllers = angular.module('gp.vegetableControllers', ['ngRoute', 'gp.services']);

vegetableControllers.controller('vegetableListController', ['$scope', 'gp.plantListService', function ($scope, plantListService) {
    $scope.vegetables = plantListService.all();
    $scope.selectVegetable = function (vegetable) {
        angular.forEach($scope.vegetables, function(veg) {
            veg.isSelected = (veg === vegetable);
        });
    };
    $scope.add = plantListService.add;
}]);

vegetableControllers.controller('vegetableDetailController', ['$scope', '$routeParams', 'gp.plantListService', function ($scope, $routeParams, plantListService) {
    $scope.vegetable = plantListService.currentPlant(plantListService.find($routeParams.vegName));
    $scope.plant = function () {
        $scope.plantVegetable($scope.vegetable);
    }
}]);
