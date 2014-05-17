'use strict';

xdescribe('Vegetable', function () {
    var scope, detailScope, listScope, $httpBackend, $routeParams;

    beforeEach(module('gp.vegetableControllers'));
    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, _$routeParams_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/api/user-veg.json').respond([
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
        ]);
        $routeParams = _$routeParams_;
        $routeParams.vegName = 'tomato';
        scope = $rootScope.$new();
        $controller('vegetableController', {$scope: scope});
        listScope = scope.$new();
        $controller('vegetableListController', {$scope: listScope});
    }));

    it('should find veg by name', function () {
        var veg;
        expect(scope.vegetables).toBeDefined();
        expect(scope.vegetables.length).toBe(1);
        $httpBackend.flush();
        expect(scope.vegetables.length).toBe(2);
        veg = scope.findVeg('tomato');
        expect(veg).toBeDefined();
        expect(veg.name).toEqual('Tomato');
    });
    
    describe('Vegetable List', function () {        
        beforeEach(function () {
            $httpBackend.flush();
        });
        
        it('should allow exactly one vegetable to be selected', function () {
            expect(listScope.vegetables.length).toBe(2);
            listScope.selectVegetable(listScope.vegetables[0]);
            expect(listScope.vegetables[0].isSelected).toBeTruthy();
            expect(listScope.vegetables[1].isSelected).toBeFalsy();
            listScope.selectVegetable(listScope.vegetables[1]);
            expect(listScope.vegetables[0].isSelected).toBeFalsy();
            expect(listScope.vegetables[1].isSelected).toBeTruthy();
        });
    });
    
    describe('Vegetable Detail', function () {
        beforeEach(inject(function ($controller) {
            $httpBackend.flush();
            detailScope = scope.$new();
            $controller('vegetableDetailController', {$scope: detailScope});
        }));

        it('should know what veg was requested', function () {
            expect($routeParams.vegName).toEqual('tomato');
            expect(detailScope.vegetables[0].name).toBe('Potato');
            expect(detailScope.vegetable).toBeDefined();
            expect(detailScope.vegetable.name).toEqual('Tomato');
        })
    });
});
