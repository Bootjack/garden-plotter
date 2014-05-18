'use strict';

describe('Vegetable List', function () {
    var scope, $httpBackend;
    
    beforeEach(module('gp.vegetableControllers'));
    beforeEach(inject(function (_$httpBackend_, $scope, $controller, plantListService) {
        $httpBackend = _$httpBackend_;
        $controller('vegetableListController', {$scope: scope});
    }));
    
    xit('should allow exactly one vegetable to be selected', function () {
        expect(scope.vegetables.length).toBe(2);
        scope.selectVegetable(scope.vegetables[0]);
        expect(scope.vegetables[0].isSelected).toBeTruthy();
        expect(scope.vegetables[1].isSelected).toBeFalsy();
        scope.selectVegetable(scope.vegetables[1]);
        expect(scope.vegetables[0].isSelected).toBeFalsy();
        expect(scope.vegetables[1].isSelected).toBeTruthy();
    });
});
