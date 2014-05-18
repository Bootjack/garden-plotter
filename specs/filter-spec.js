'use strict';

describe('Filters', function () {
    beforeEach(module('gp.dateFilters'));
    
    describe('Casual time', function () {
        var date = new Date(0);
        it('should format a date with full month and suffixed date', inject(function (casualTimeFilter) {
            expect(casualTimeFilter(date)).toEqual('January 1st');
            date.setUTCDate(date.getUTCDate() + 1);
            expect(casualTimeFilter(date)).toEqual('January 2nd');
            date.setUTCDate(date.getUTCDate() + 1);
            expect(casualTimeFilter(date)).toEqual('January 3rd');
            date.setUTCDate(date.getUTCDate() + 1);
            expect(casualTimeFilter(date)).toEqual('January 4th');
            date.setUTCDate(date.getUTCDate() + 7);
            expect(casualTimeFilter(date)).toEqual('January 11th');
            date.setUTCDate(date.getUTCDate() + 1);
            expect(casualTimeFilter(date)).toEqual('January 12th');
            date.setUTCDate(date.getUTCDate() + 1);
            expect(casualTimeFilter(date)).toEqual('January 13th');
            date.setUTCDate(date.getUTCDate() + 8);
            expect(casualTimeFilter(date)).toEqual('January 21st');
            date.setUTCDate(date.getUTCDate() + 1);
            expect(casualTimeFilter(date)).toEqual('January 22nd');
            date.setUTCDate(date.getUTCDate() + 1);
            expect(casualTimeFilter(date)).toEqual('January 23rd');
            date.setUTCDate(date.getUTCDate() + 90);
            expect(casualTimeFilter(date)).toEqual('April 23rd');
        }));
    });

    describe('Days after today', function () {
        var date, daysAfterTodayFilter;
        
        beforeEach(inject(function (_daysAfterTodayFilter_) {
            date = new Date();
            daysAfterTodayFilter = _daysAfterTodayFilter_;
        }));
        
        it('should return a date X days from today', function () {
            expect(daysAfterTodayFilter(0).getUTCDate()).toEqual(date.getUTCDate());
        });
        it('should return a date X days from an arbitrary date', function () {
            expect(daysAfterTodayFilter(5, new Date(0))).toEqual(new Date(5 * 24 * 60 * 60 * 1000));
        })
    });
});
