var app = angular.module('gardenPlotter', []);

app.controller('BuildController', ['$scope', function ($scope) {
    $scope.info = {
        name: 'Garden Plotter',
        version: "2.0.0"
    };
}]);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    var placeholderVeg = {name: 'No veg yet!', isPlaceholder: true};
    $scope.vegetables = [placeholderVeg];
    $scope.vegetable = {name: 'Tomato'};
    $scope.sort = 'timeline.added';
    $scope.addVegetable = function (veg) {
        if (-1 !== $scope.vegetables.indexOf(placeholderVeg)) {
            $scope.vegetables.splice($scope.vegetables.indexOf(placeholderVeg), 1);
        }
        veg.timeline = {added: new Date().getTime()};
        $scope.vegetables.push(angular.copy(veg));
        $scope.vegetable = {};
    }
}]);

app.controller('VegetableListController', ['$scope', function ($scope) {
    $scope.selectVegetable = function (vegetable) {
        angular.forEach($scope.vegetables, function(veg) {
            veg.isSelected = (veg === vegetable);
        });
    }
})];
