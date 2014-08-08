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

angular.module('gp.dateFilters', [])
    .filter('casualTime', function () {
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        return function (time) {
            var day, ending;
            day = time.getUTCDate();
            ending = 'th';
            if (day < 4 || day > 13) {
                if (1 === day % 10) {
                    ending = 'st';
                } else if (2 === day % 10) {
                    ending = 'nd';
                } else if (3 === day % 10) {
                    ending = 'rd';
                }
            }
            return months[time.getUTCMonth()] + ' ' + day + ending;   
        }
    })
    .filter('daysAfterToday', function () {
        return function (days, start) {
            var today = new Date(start || Date.now());
            today.getUTCDate();
            today.setUTCMilliseconds(0);
            today.setUTCSeconds(0);
            today.setUTCMinutes(0);
            today.setUTCHours(0);
            today.setUTCDate(today.getUTCDate() + days);
            return today;
        };
    });

/**
 * Handles all modal dialog boxes in UI
 * Allows only one dialog to be active at a time.
 */

angular.module('gp.services.dialogs', [])
    .factory('dialogService', [function dialogFactory() {
        var controllerScope, dialog, DialogService;
        
        dialog = {};
        
        DialogService = {
            dialog: function (config) {
                if (config) {
                    dialog.title = config.title;
                    dialog.template = config.template;
                    dialog.data = config.data;
                    dialog.actions = config.actions;
                }
                
                if (controllerScope) {
                    controllerScope.updateDialog(dialog);
                    this.show();
                }
                
                return dialog;
            },
            
            show: function () {
                if (controllerScope) {
                    controllerScope.active = true;
                }
                return this;
            },
            
            hide: function () {
                if (controllerScope) {
                    controllerScope.active = false;
                }
                return this;
            },
            
            wire: function (scope) {
                controllerScope = scope;
            }
        };

        return DialogService;
    }])
    .controller('dialogController', ['$scope', 'dialogService', function($scope, dialogService) {
        dialogService.wire($scope);
        $scope.updateDialog = function (dialog) {
            $scope.dialog = dialog;
            return this;
        };
    }]);

angular.module('gp.services.gardens', [])
    .factory('gp.gardenService', [function gardenFactory () {
        var currentGarden, gardens, GardenService;

        gardens = [];
        
        function Garden(name, config) {
            var i, _name;
            i = 1;
            _name = name.toString();
            while (GardenService.find(name) && i < 100) {
                i += 1;
                name = _name + ' ' + i;
            }
            this.name = name;
            this.plants = [];
        }
        
        Garden.prototype.plant = function (plant, direct) {
            var planting;
            if (!plant) {
                throw new Error('No plant provided!')
            }

            date = new Date();
            direct = ('undefined' !== typeof direct) ? !!direct : true;

            planting = {
                plant: plant,
                planned: {
                    sow: direct && date,
                    set: !direct && date
                },
                actual: {
                    sow: null,
                    germinate: null,
                    set: null,
                    harvest: null
                }
            };
                
            this.plants.push(planting);
            return planting;
        };
        
        GardenService = {
            add: function (name) {
                gardens.push(new Garden(name));
            },

            find: function (name) {
                var foundGarden;
                angular.forEach(gardens, function (garden) {
                    if (garden.name === name) {
                        foundGarden = garden;
                    }
                });
                return foundGarden;
            },
            
            all: function () {
                return gardens;  
            },

            currentGarden: function (garden) {
                if (garden) {
                    currentGarden = garden;
                }
                return currentGarden;
            }
        };

        GardenService.add('My Garden');
        currentGarden = gardens[0];
        
        return GardenService;
    }])
    .controller('gardenPlantingController', ['gp.gardenService', function (gardenService) {
        
    }]);

angular.module('gp.services.plants', [])
    .factory('gp.plantListService', ['$http', function plantListFactory($http) {
        var currentPlant, placeholderPlant, plants, plantListService;

        placeholderPlant = {name: 'No plants yet!', isPlaceholder: true};
        currentPlant = placeholderPlant;
        plants = [];
        
        plantListService = {
            add: function (plant) {
                if (-1 !== plants.indexOf(placeholderPlant)) {
                    plants.splice(plants.indexOf(placeholderPlant), 1);
                }
                plant.timeline = {added: new Date().getTime()};
                plants.push(angular.copy(plant));
            },
            find: function (name) {
                var foundPlant, nameRegExp;
                nameRegExp = new RegExp(name, 'i');
                angular.forEach(plants, function (plant) {
                    if (plant.name.match(nameRegExp)) {
                        foundPlant = plant;
                    }
                });
                return foundPlant;
            },
            all: function () {
                return plants;
            },
            currentPlant: function (plant) {
                if (plant) {
                    currentPlant = plant;
                }
                return currentPlant;
            }
        };

        $http.get('/api/user-veg.json').success(function (data) {
            angular.forEach(data, function (plant) {
                plantListService.add(plant);
            });
        });
        
        return plantListService;
    }]);

var plotControllers = angular.module('gp.plotControllers', ['gp.services.gardens']);

plotControllers.controller('plotListController', ['$scope', 'gp.gardenService', function ($scope, gardenService) {
    $scope.gardens = gardenService.all();
}]);

plotControllers.controller('plotDetailController', ['$scope', 'gp.gardenService', function ($scope, gardenService) {
    $scope.garden = gardenService.currentGarden();
}]);


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
