(function () {
    'use strict';

    //var app = angular.module('COMSTU', ['ngRoute', 'toastr', 'ngStorage', 'angular-jwt', 'ngMaterial', 'ngMenuSidenav', 'ngMessages', 'md.data.table', 'angular-loading-bar', 'angularMoment', 'ngIdle', 'ngFileUpload', 'ngResource', 'ngSanitize', 'ngCsv', 'chart.js']);
    var app = angular.module('COMSTU', ['ngRoute', 'ngStorage', 'angular-loading-bar', 'toastr']);
    app.constant('baseUrl', 'api');

    app.run(function ($rootScope, $location, $sessionStorage, $timeout) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.currentUrl = $location.path();
        });
    });

}());