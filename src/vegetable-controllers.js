var vegetableControllers = angular.module('gp.vegetableControllers', ['ngRoute']);

vegetableControllers.controller('vegetableController', ['$scope', '$http', function ($scope, $http) {
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
    };
    $scope.findVeg = function (name) {
        var foundVeg, nameRegExp;
        nameRegExp = new RegExp(name, 'i');
        angular.forEach($scope.vegetables, function (veg) {
            if (veg.name.match(nameRegExp)) {
                foundVeg = veg;
            }
        });
        return foundVeg;
    };
    $http.get('/api/user-veg.json').success(function (data) {
        angular.forEach(data, function (veg) {
            $scope.addVegetable(veg);
        });
    });
}]);

vegetableControllers.controller('vegetableListController', ['$scope', function ($scope) {
    $scope.selectVegetable = function (vegetable) {
        angular.forEach($scope.vegetables, function(veg) {
            veg.isSelected = (veg === vegetable);
        });
    }
}]);

vegetableControllers.controller('vegetableDetailController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.vegetable = $scope.findVeg($routeParams.vegName);
    $scope.plant = function () {
        $scope.plantVegetable($scope.vegetable);
    }
}]);
