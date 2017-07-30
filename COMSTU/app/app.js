(function () {
    'use strict';

    var app = angular.module('AMApp', ['ngRoute', 'toastr', 'ngStorage', 'blocks.logger', 'blocks.exception', 'angular-jwt', 'ngMockE2E', 'ngMaterial', 'ngMenuSidenav', 'ngMessages', 'md.data.table', 'angularMoment', 'angular-loading-bar', 'ui.router']);
   
    app.constant('baseUrl', 'Api');
   //app.constant('baseUrl', '')
    app.constant('evoUrl', '')
    app.constant('tokenServiceUrl', '')

     .config(function ($stateProvider, $urlRouterProvider) {

         $urlRouterProvider.otherwise('/tab/dash');
         $stateProvider
         .state('view1', {
             url: "/view1",
             templateUrl: "partials/view1.html"
         })
         .state('view2', {
             url: "/view2",
             templateUrl: "partials/view2.html"
         })
         .state('view3', {
             url: "/view3",
             templateUrl: "partials/view3.html"
         });
     })

})();