'use strict';

describe('Garden Plotter', function () {
    var scope;
    
    beforeEach(angular.mock.module('gardenPlotter'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('buildController', {$scope: scope});
    }));

    it('should be called Garden Plotter', function () {
        expect(scope.info.name).toBe('Garden Plotter');
    });
    
    it('should be version 2.0.0', function () {
        expect(scope.info.version).toBe('2.0.0');
    });

});
