'use strict';

describe('Vegetable Detail', function () {
    var scope, detailScope;

    beforeEach(module('gardenPlotter'));
    beforeEach(inject(function ($rootScope, $controller, $routeParams) {
        $routeParams.vegName = 'tomato';
        scope = $rootScope.$new();
        scope.vegetables = [
            {name: 'Potato', lifecycle: {
                daysToGerminate: 12,
                daysToHarvest: 64,
                perennial: false
            }},
            {name: 'Tomato', lifecycle: {
                daysToGerminate: 8,
                daysToHarvest: 50,
                perennial: false
            }}
        ];
        $controller('vegetableController', {$scope: scope});
        detailScope = scope.$new();
        $controller('vegetableDetailController', {$scope: detailScope});
    }));
    
    it('should know what veg was requested', function () {
        expect(scope.vegetable).toBeDefined();
        expect(scope.vegetable.name).toEqual('Tomato');
    })
});
