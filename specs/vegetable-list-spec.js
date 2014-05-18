'use strict';

xdescribe('Vegetable List', function () {
    var scope;
    
    beforeEach(module('gp.vegetableControllers'));
    beforeEach(inject(function ($controller, $rootScope) {
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
        
        $controller('vegetableListController', {$scope: scope});
    }));
    
    it('should allow exactly one vegetable to be selected', function () {
        expect(scope.vegetables.length).toBe(2);
        scope.selectVegetable(scope.vegetables[0]);
        expect(scope.vegetables[0].isSelected).toBeTruthy();
        expect(scope.vegetables[1].isSelected).toBeFalsy();
        scope.selectVegetable(scope.vegetables[1]);
        expect(scope.vegetables[0].isSelected).toBeFalsy();
        expect(scope.vegetables[1].isSelected).toBeTruthy();
    });
});
