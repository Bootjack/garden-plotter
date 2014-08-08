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
