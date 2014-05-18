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
});
