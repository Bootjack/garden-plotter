var vegetableControllers = angular.module('gp.vegetableControllers', ['ngRoute', 'gp.services.plants', 'gp.services.gardens', 'gp.services.dialogs']);

vegetableControllers.controller('vegetableListController', [
    '$scope', 'gp.plantListService', 'gp.gardenService', 'dialogService',
    function ($scope, plantListService, gardenService, dialogService) {
        $scope.vegetables = plantListService.all();
        $scope.selectVegetable = function (vegetable) {
            $scope.current = vegetable;
            angular.forEach($scope.vegetables, function(veg) {
                veg.isSelected = (veg === vegetable);
            });
        };
        $scope.plant = function (plant) {
            var garden = gardenService.currentGarden();
            dialogService.dialog({
                title: 'Plant it Now!',
                template: 'dialog-plant',
                data: {plant: plant, date: new Date()},
                actions: [
                    { 
                        name: 'Cancel',
                        do: function () {
                            dialogService.hide();
                        }
                    },
                    {
                        name: 'Plant!',
                        do: function () {
                            garden.plant(plant);
                            dialogService.hide();
                        }
                    }
                ]
            });
        };
        $scope.add = function () {
            plantListService.add(params);
        }
    }
]);

vegetableControllers.controller('vegetableDetailController', [
    '$scope', '$routeParams', 'gp.plantListService', 'gp.gardenService', 
    function ($scope, $routeParams, plantListService) {
        $scope.vegetable = plantListService.currentPlant(plantListService.find($routeParams.vegName));
    }
]);
