

angular.module('plasticManufacturer')
    .controller("CustomerController", function ($scope, $http) {

        $http.get("http://localhost:55751/api/Customers").then(function (response) {
            $scope.Customers = response.data;
        });

    });