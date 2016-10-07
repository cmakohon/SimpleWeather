/**
 * Created by cmakohon on 9/17/16.
 */

/* weather api key: 8a0a3e42b0668a07c7c695c10e0df6aa */

angular.module('app1', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('app1').config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

});
angular.module('app1').controller('TypeaheadCtrl', function($scope, $http) {

    $scope.zipcity = '';
    $scope.currTemp = '';
    $scope.sentence = "WAITING FOR INPUT";
    $scope.auto_results = 0;
    $scope.result = '';
    $scope.test1 = 'wait';
    $scope.test2 = 'wait';
    $scope.test3 = 'wait';
    $scope.test4 = 'wait';

    $scope.getLocation = function(val) {
        $scope.asyncSelected = '';
        return $http.get('http://autocomplete.wunderground.com/aq', {
            timeout: 5000,
            headers :{"Content-Type": "application/json", "Access-Control-Allow-Origin":"*"},
            params: {
                query: val
            }
        }).then(function(response) {
                $scope.sentence = "SUCCESS";
                // $scope.result = response.data.RESULTS;
                // return $scope.result;

                // $scope.sentence = response;
                // $window.alert(response);
                // $scope.result = angular.fromJson(response);
                // $scope.currTemp = parseInt($scope.result.data.main.temp);
                // $scope.currTemp = (1.8 * ($scope.currTemp - 273)) + 32;
                // $scope.sentence = 'Current temperature for ' + $scope.zipcity + ' is ' + $scope.currTemp + ' degrees fahrenheit.';
            }, function(response) {
                $scope.sentence = "FAILURE";
            $scope.test1 = response.config;
            $scope.test2 = response.statusText;
            $scope.test3 = response.headers;
            $scope.test4 = response.status;

            });
    };
});