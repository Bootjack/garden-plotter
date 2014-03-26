'use strict';

describe('Vegetable List', function () {
    var scope;
    
    beforeEach(angular.mock.module('gardenPlotter'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        scope.vegetables = [
            {name: 'Potato'},
            {name: 'Tomato'}
        ];
        $controller('VegetableListController', {$scope: scope});
    }));
    
    it('should allow exactly one vegetable to be selected', function () {
        scope.selectVegetable(scope.vegetables[0]);
        expect(scope.vegetables[0].isSelected).toBeTruthy();
        expect(scope.vegetables[1].isSelected).toBeFalsy();
        scope.selectVegetable(scope.vegetables[1]);
        expect(scope.vegetables[0].isSelected).toBeFalsy();
        expect(scope.vegetables[1].isSelected).toBeTruthy();
    });
});
