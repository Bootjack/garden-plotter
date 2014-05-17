var gardenPlotterApp = angular.module('gardenPlotter', ['ngRoute', 'gp.vegetableControllers', 'gp.plotControllers', 'gp.dateFilters']);

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
        })
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
