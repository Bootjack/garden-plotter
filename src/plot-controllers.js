var plotControllers = angular.module('gp.plotControllers', []);

plotControllers.controller('plotController', ['$scope', function ($scope) {
    var plotPlaceholder = {name: 'My Garden Plot', isPlacehoder: true};
    
    $scope.plots = [plotPlaceholder];
    $scope.plot = $scope.plots[0];
    
    $scope.plantVegetable = function (veg, plot, date, direct) {
        if (!veg) {
            throw new Error('Unable to plant: No vegetable provided!')
        }
        plot = plot || $scope.plots[0];
        date = date || new Date();
        direct = ('undefined' !== typeof direct) ? direct : true;
        plot.plants = plot.plants || [];
        plot.plants.push({
            vegetable: veg,
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
        });
    };
}]);

plotControllers.controller('plotListController', ['$scope', function ($scope) {

}]);

plotControllers.controller('plotDetailController', ['$scope', function ($scope) {
    
}]);

