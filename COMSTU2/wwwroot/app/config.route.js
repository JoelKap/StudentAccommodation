(function () {

    'use strict';




    var routeProvider = function ($routeProvider) {

        var viewBase = '/app/components/';
        var viewBaseCommon = '/app/common/';

        // Client
        $routeProvider.when('/home', {
            controller: 'homeController',
            templateUrl: viewBase + 'home/homeView.html',
            controllerAs: 'vm'
        })
            .when('/homeDetail', {
                controller: 'homeDetailController',
                templateUrl: viewBase + 'home/homeDetail/homeDetail.html',
                controllerAs: 'vm'
            })
            .when('/register', {
                controller: 'registerController',
                templateUrl: viewBase + 'register/register.html',
                controllerAs: 'vm'
            })
            .when('/logout', {
                controller: 'homeController',
                templateUrl: viewBase + 'home/homeView.html',
                controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'loginController',
                templateUrl: viewBaseCommon + 'login/login.html',
                controllerAs: 'vm'
            })
            .when('/bookAccommodation', {
                controller: 'bookAccommodationController',
                templateUrl: viewBase + 'student/bookAccommodation/bookAccommodation.html',
                controllerAs: 'vm'
            })
            .when('/registerLandlord', {
                controller: 'registerlandlordController',
                templateUrl: viewBase + 'student/registerlandlord/registerlandlord.html',
                controllerAs: 'vm'
            })
            .when('/studentAccount', {
                controller: 'studentAccountController',
                templateUrl: viewBase + 'student/studentAccount/studentAccount.html',
                controllerAs: 'vm'
            })
            .when('/studentProfile', {
                controller: 'studentProfileController',
                templateUrl: viewBase + 'student/studentProfile/studentProfile.html',
                controllerAs: 'vm'
            })
            .when('/accommodationManagement', {
                controller: 'accommodationManagementController',
                templateUrl: viewBase + 'landlord/accommodationProfile/accommodationManagement.html',
                controllerAs: 'vm'
            })
            .when('/landlordProfile', {
                controller: 'landlordProfileController',
                templateUrl: viewBase + 'landlord/landlordProfile/landlordProfile.html',
                controllerAs: 'vm'
            })
            .when('/adminAccountManagement', {
                controller: 'adminAccountManagementController',
                templateUrl: viewBase + 'admin/adminAccountManagement/adminAccountManagement.html',
                controllerAs: 'vm'
            })
            .when('/adminActivateAccommodation', {
                controller: 'adminActivationController',
                templateUrl: viewBase + 'admin/adminActivationAccommodation/adminActivation.html',
                controllerAs: 'vm'
            })
            .when('/successfullCheckOut', {
                controller: 'paymentSuccesfulController',
                templateUrl: viewBaseCommon + 'paymentSucess/paymentSucesful.html',
                controllerAs: 'vm'
            })
            .when('/unsuccessfullCheckOut', {
                controller: 'paymentErrorController',
                templateUrl: viewBaseCommon + 'paymentError/paymentError.html',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/404'
            });
    }
    angular.module('COMSTU').config(['$routeProvider', routeProvider]);
    routeProvider.$inject = ['$routeProvider',];
}());
