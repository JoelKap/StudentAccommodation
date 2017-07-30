(function () {
    'use strict';
    var routeProvider = function ($routeProvider, $locationProvider) {

        var viewBase = '/app/components/';

        $routeProvider.when('/viewUsers', {
            controller: 'userViewController',
            templateUrl: viewBase + 'user/viewUser/user.view.html',
            controllerAs: 'vm'

        }).when('/userProfile', {
            controller: 'UserProfileController',
            templateUrl: 'http://" + $window.location.host + "/userProfile.html', 
            controllerAs: 'vm'
        })
            .when('/AssignLinkApplicationRole', {
                controller: 'applicationLinkToRoles',
                templateUrl: viewBase + 'linkApplication/link.role.application.html',
                controllerAs: 'vm'
            }).when('/addEditUser', {
                controller: 'userAddEditController',
                templateUrl: viewBase + 'user/addEditUser/user.addEdit.html',
                controllerAs: 'vm'
            })

            .when('/createApplication', {
                controller: 'applicationCreateController',
                templateUrl: viewBase + 'application/addEditApplication/application.create.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: viewBase + 'application/login/login.html',
                controllerAs: 'vm'
            })

             .when('/customerSearch', {
                 controller: 'customerSearchController',
                 templateUrl: viewBase + 'linkApplication/customerSearch/customers.template.html',
                 controllerAs: 'vm'
             })

                                                       

            .when('/createRole', {
                controller: 'roleCreateController',
                templateUrl: viewBase + 'application/role/role.create.html',
                controllerAs: 'vm'
            })

            .when('/alert', {
                controller: 'alertDialog.controller',
                templateUrl: viewBase + 'alert/alertDialog.template.html',
                controllerAs: 'vm'
            })

            .when('/createClaim', {
                controller: 'claimCreateController',
                templateUrl: viewBase + 'application/claim/claim.create.html',
                controllerAs: 'vm'
            })

            .when('/index', {
                controller: 'IndexController',
                templateUrl: viewBase + 'index.html',
                controllerAs: 'vm'
            })

            .when('/404', {
                controller: 'pageNotFoundController',
                templateUrl: viewBase + '404/404.html',
                controllerAs: 'vm'
            })

            .otherwise({
                redirectTo: '/404'
            });

    }

    angular.module('AMApp').config(['$routeProvider', '$locationProvider', routeProvider]);
    routeProvider.$inject = ['$routeProvider', '$locationProvider'];

})();