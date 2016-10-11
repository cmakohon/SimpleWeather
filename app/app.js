/**
 * Created by cmakohon on 9/17/16.
 */

/* weather api key: 8a0a3e42b0668a07c7c695c10e0df6aa */
/* google places api key: AIzaSyDt-ht6qG72qyEiNbaJOiyTLtogZRXj9EQ */

var app = angular.module('app1', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('TypeaheadCtrl', function($scope, $http) {

    $scope.zipcity = '';
    $scope.currTemp = '';
    $scope.sentence = "WAITING FOR INPUT";
    $scope.auto_results = 0;
    $scope.result = '';
    $scope.test1 = 'wait';
    $scope.test2 = 'wait';
    $scope.test3 = 'wait';
    $scope.test4 = 'wait';

    $scope.getLocation = function (val) {
        $scope.asyncSelected = '';

        // $.ajax({
        //     url: "http://autocomplete.wunderground.com/aq",
        //     dataType: "jsonp",
        //     data: {
        //         "query": val,
        //         "c": "US"
        //     },
        //     crossDomain: true,
        //     complete: function (result, data) {
        //         $scope.sentence = result;
        //     }
        //
        // });

        // $.get('http://autocomplete.wunderground.com/aq?query=' + val, function(data, status){
        //     $scope.sentence = "SUCCESS";
        //     alert("Data: " + data + "\nStatus: " + status);
        // });

        return $http({
            method: 'JSONP',
            url: 'http://autocomplete.wunderground.com/aq?c=US&cb=JSONP&query=' + val
        }).then(function(response) {
                $scope.sentence = "SUCCESS";
                // $scope.result = response.data.RESULTS;
                // return $scope.result;

                // $scope.sentence = response;
                // $window.alert(response);
                // $scope.result = angular.fromJson(response);
            }, function(response) {
                $scope.sentence = response;
                $scope.test1 = response.config;
                $scope.test2 = response.statusText;
                $scope.test3 = response.data;
                $scope.test4 = response.status;

            });

        // return $http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
        //     params: {
        //         input: val,
        //         types: '(cities)',
        //         key: 'AIzaSyDt-ht6qG72qyEiNbaJOiyTLtogZRXj9EQ'
        //     }
        // }).then(function (response) {
        //     $scope.sentence = "SUCCESS";
        //     $scope.test1 = response.config;
        //     $scope.test2 = response.statusText;
        //     $scope.test3 = response.data;
        //     $scope.test4 = response.status;
        //
        // }, function (response) {
        //     $scope.sentence = "ERROR";
        //     $scope.test1 = response.config;
        //     $scope.test2 = response.statusText;
        //     $scope.test3 = response.data;
        //     $scope.test4 = response.status;
        // });
    };
});