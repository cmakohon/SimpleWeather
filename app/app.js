/**
 * Created by cmakohon on 9/17/16.
 */

/* weather api key: 8a0a3e42b0668a07c7c695c10e0df6aa */
/* google places api key: AIzaSyDt-ht6qG72qyEiNbaJOiyTLtogZRXj9EQ */

var app = angular.module('app1', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('MainCtrl', function($scope, $http) {

    $scope.zipcity = '';
    $scope.auto_results = 0;
    $scope.zmw = '';
    $scope.something = [];
    $scope.selected = '';
    $scope.show_forecast = false;
    $scope.shift_up = '';
    $scope.hourly = false;
    $scope.three_day = true;
    $scope.seven_day = false;
    $scope.day_one_high3 = '';
    $scope.day_two_high3 = '';
    $scope.day_three_high3 = '';
    $scope.day_one_low3 = '';
    $scope.day_two_low3 = '';
    $scope.day_three_low3 = '';
    $scope.day_one_date3 = '';
    $scope.day_two_date3 = '';
    $scope.day_three_date3 = '';

    $scope.getLocation = function(val) {
        var url = "http://autocomplete.wunderground.com/aq?c=US&cb=JSON_CALLBACK&query=" + val;
        var autocities = [];
        return $http.jsonp(url).
        then(function(response) {
            // this callback will be called asynchronously
            // when the response is available

            for (i in response.data.RESULTS) {
                if(i < 5) {
                    autocities[i] = response.data.RESULTS[i];
                }
            }

            return autocities;

        });
    };

    $scope.getThreeDay = function (val) {
        var url = "http://api.wunderground.com/api/710f6454a7c060eb/forecast/q/zmw:" + val + ".json";
        $http.get(url).then(function(response) {
            $scope.day_one_high3 = response.data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
            $scope.day_two_high3 = response.data.forecast.simpleforecast.forecastday[1].high.fahrenheit;
            $scope.day_three_high3 = response.data.forecast.simpleforecast.forecastday[2].high.fahrenheit;
            $scope.day_one_low3 = response.data.forecast.simpleforecast.forecastday[0].low.fahrenheit;
            $scope.day_two_low3 = response.data.forecast.simpleforecast.forecastday[1].low.fahrenheit;
            $scope.day_three_low3 = response.data.forecast.simpleforecast.forecastday[2].low.fahrenheit;
            $scope.day_one_date3 = response.data.forecast.simpleforecast.forecastday[0].date.pretty;
            $scope.day_two_date3 = response.data.forecast.simpleforecast.forecastday[1].date.pretty;
            $scope.day_three_date3 = response.data.forecast.simpleforecast.forecastday[2].date.pretty;
            $scope.apply();
        }, function(error) {
            alert("ERROR");
        });
    };

    $scope.loadWeather = function(val) {
        $scope.zmw = val.zmw;
        $scope.shift_up = 'shift-up';
        $scope.show_forecast = true;
        $scope.presel = 'active';
        $scope.getThreeDay($scope.zmw);
    };

    $scope.checkSpan = function(val) {
        if(val == 'Hourly') {
            $scope.hourly = true;
            $scope.three_day = false;
            $scope.seven_day = false;
        } else if(val == '3 Day') {
            $scope.hourly = false;
            $scope.three_day = true;
            $scope.seven_day = false;
        } else if(val == '7 Day') {
            $scope.hourly = false;
            $scope.three_day = false;
            $scope.seven_day = true;
        }
        $scope.apply();
    };

});