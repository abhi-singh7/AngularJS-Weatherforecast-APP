// MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES

weatherApp.config(function ($routeProvider){

    $routeProvider

    .when('/',{
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })

    .when('/forecast',{
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })


});


weatherApp.service('cityService', function(){
    this.city = "Delhi";
});


// CONTROLLER

weatherApp.controller('homeController', ['$scope','$location','cityService', function($scope, $location, cityService){

    $scope.city = cityService.city;
    

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });

        $scope.submit = function(){
            $location.path("/forecast")
        }

}]);

weatherApp.controller('forecastController', ['$scope','$resource','cityService', 
function($scope, $resource, cityService){

    $scope.city = cityService.city;
    
    

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?appid=f937c18c90bc44916e741a54517fd1b8", {
        callback: "JSON_CALLBACK" }, {get: { method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city});

    $scope.convertToFahrenheit = function(degK){
        return Math.round(degK - 273);
    }
    //$scope.convertToDate = function(dt) {       // not required in latest response from open weater
       // return new Date((dt*1000));  
    //}

    console.log($scope.weatherResult);

}]);






