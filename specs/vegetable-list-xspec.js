'use strict';

describe('Vegetable List', function () {
    var scope, listScope;
    
    beforeEach(module('gardenPlotter'));
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        $controller('vegetableController', {$scope: scope});
        listScope = scope.$new();
        $controller('vegetableListController', {$scope: listScope});
    }));
    
    it('should allow exactly one vegetable to be selected', function () {
        expect(scope.vegetables.length).toBe(2);
        listScope.selectVegetable(scope.vegetables[0]);
        expect(scope.vegetables[0].isSelected).toBeTruthy();
        expect(scope.vegetables[1].isSelected).toBeFalsy();
        listScope.selectVegetable(scope.vegetables[1]);
        expect(scope.vegetables[0].isSelected).toBeFalsy();
        expect(scope.vegetables[1].isSelected).toBeTruthy();
    });
});
