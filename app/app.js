/**
 * Created by cmakohon on 9/17/16.
 */

/* weather api key: 8a0a3e42b0668a07c7c695c10e0df6aa */
/* google places api key: AIzaSyDt-ht6qG72qyEiNbaJOiyTLtogZRXj9EQ */

var app = angular.module('app1', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('TypeaheadCtrl', function($scope, $http) {

    $scope.zipcity = '';
    $scope.sentence = "WAITING FOR INPUT";
    $scope.auto_results = 0;
    $scope.result = '';
    $scope.something = [];

    // $scope.getLocation = function (val) {
    //     $scope.asyncSelected = '';
    //     var autocities = [];
    //
    //     return $.ajax({
    //         url: "http://autocomplete.wunderground.com/aq?c=US&query=" + val,
    //         dataType: 'jsonp',
    //         jsonp: "cb",
    //         cache: 'false',
    //         success: function(data) {
    //             $scope.sentence = "SUCCESS";
    //             // // alert("" + angular.fromJson(data));
    //             //
    //             // for (i in data.RESULTS) {
    //             //     autocities[i] = data.RESULTS[i]['name'];
    //             // }
    //             //
    //             // alert(autocities);
    //             // return autocities;
    //
    //             // alert(data.RESULTS.map(function(item){
    //             //     return item.name;
    //             // }));
    //             autocities = data.RESULTS.map(function(item){
    //                 return item.name;
    //             });
    //
    //             $scope.something = autocities;
    //
    //             return autocities;
    //
    //             // alert(autocities.toString());
    //
    //         },
    //         error: function(data) {
    //             alert("ERROR: " + data);
    //         }
    //     });
    // };

    // $scope.getLocation = function(val) {
    //     return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
    //         params: {
    //             address: val,
    //             sensor: false
    //         }
    //     }).then(function(response){
    //         alert(response.data.results.map(function(item){
    //             return item.formatted_address;}));
    //         return response.data.results.map(function(item){
    //             return item.formatted_address;
    //         });
    //     });
    // };

    $scope.getLocation = function(val) {
        var url = "http://autocomplete.wunderground.com/aq?c=US&cb=JSON_CALLBACK&query=" + val;
        var autocities = [];
        return $http.jsonp(url).
        then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.sentence = "SUCCESS";

            for (i in response.data.RESULTS) {
                if(i < 5) {
                    autocities[i] = response.data.RESULTS[i]['name'];
                }
            }

            return autocities;

            // return response.data.RESULTS.map(function(item){
            //     return item.name;
            // });

            // $scope.something = autocities;
            // console.log(data.RESULTS);
            //
            // return autocities;

        });
    };

});