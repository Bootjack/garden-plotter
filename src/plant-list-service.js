angular.module('gp.services', [])
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
