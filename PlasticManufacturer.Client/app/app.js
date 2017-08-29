    var app = angular.module("plasticManufacturer", ["common.services","ngRoute"])
    .config(['$routeProvider',  '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/rawMaterial', { templateUrl: 'app/view/rawmaterial.html' });
        $routeProvider.when('/customer', { templateUrl: 'app/view/customer.html' });
        $routeProvider.when('/cmr', { templateUrl: 'app/view/colorMatchRequest.html' });


         $routeProvider.otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({enabled: true, requireBase: false});
            

    }]);

