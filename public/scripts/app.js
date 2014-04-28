var gardenPlotterApp = angular.module('gardenPlotter', ['ngRoute', 'vegetableControllers', 'gardenPlotterFilters']);

gardenPlotterApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/veg', {
            templateUrl: '/vegetable-list.html',
            controller: 'vegetableListController'
        })
        .when('/veg/:vegName', {
            templateUrl: '/vegetable-detail.html',
            controller: 'vegetableDetailController'
        })
        .otherwise({
            redirectTo: '/veg'
        })
}]);

gardenPlotterApp.controller('buildController', ['$scope', function ($scope) {
    $scope.info = {
        name: 'Garden Plotter',
        version: "2.0.0"
    };
}]);

angular.module('gardenPlotterFilters', [])
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

var vegetableControllers = angular.module('vegetableControllers', []);

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
}]);
