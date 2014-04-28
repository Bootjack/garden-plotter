angular.module('gardenPlotterFilters', [])
    .filter('casualTime', function () {
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        return function (time) {
            var day, ending;
            day = time.getUTCDate();
            ending = 'th';
            if (day < 4 || day > 13) {
                if (1 === day % 10) {
                    ending = 'st';                    
                } else if (2 === day % 10) {
                    ending = 'nd';
                } else if (3 === day % 10) {
                    ending = 'rd';
                }
            }
            return months[time.getUTCMonth()] + ' ' + day + ending;
        }
    })
    .filter('daysAfterToday', function () {
        return function (days, start) {
            var today = new Date(start || Date.now());
            today.getUTCDate();
            today.setUTCMilliseconds(0);
            today.setUTCSeconds(0);
            today.setUTCMinutes(0);
            today.setUTCHours(0);
            today.setUTCDate(today.getUTCDate() + days);
            return today;
        };
    });
