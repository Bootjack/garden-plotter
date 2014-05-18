'use strict';

describe('Plant List Service', function () {
    var scope, detailScope, listScope, $httpBackend;

    beforeEach(module('gp.services'));
    beforeEach(inject(['$httpBackend', function (_$httpBackend_) {
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
    }]));

    it('should find veg by name', inject(['gp.plantListService', function (plantListService) {
        var plant;
        expect(plantListService.all().length).toBe(0);
        $httpBackend.flush();
        expect(plantListService.all().length).toBe(2);
        plant = plantListService.find('tomato');
        expect(plant).toBeDefined();
        expect(plant.name).toEqual('Tomato');
    }]));
    
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
