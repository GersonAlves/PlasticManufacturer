/// <reference path="D:\Projects\PlasticManufacturer\ViewAulus\Scripts/angular.min.js" />

angular.module('plasticManufacturer')
    .controller("CustomerController", function ($scope, $http) {

        $http.get("welcome.htm").then(function (response) {
            $scope.customer = response.data;
        });

    });