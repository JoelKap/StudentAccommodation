(function () {
    'use strict';

    function indexController($location, $sessionStorage, $scope, $rootScope) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'index';
        vm.userAuthenticated = false;
        $scope.isStudent = false
        $scope.isLandlord = false;
        $scope.isAdmin = false;
        init();

        function init() {
            if ($sessionStorage.logonUser) {
                $scope.userAuthenticated = true;
                if ($sessionStorage.logonUser.userType == 'student') {
                    $scope.isStudent = true;
                }
                else if ($sessionStorage.logonUser.userType == "landlord") {
                    $scope.isLandlord = true;
                }
            }
            else {
                vm.userAuthenticated = false;
                $location.path('/home');
            }
            //if ($rootScope.user) {
            //    if ($rootScope.user.userType == 'student') {
            //        vm.isStudent = true;
            //    }
            //    else if ($rootScope.user.userType == "landlord"){
            //        vm.isLandlord = true;
            //    }
            //}
        }

        $scope.navigateTo = function (url) {
            $location.path(url);
        }
        $scope.navigateTo2 = function () {
            $sessionStorage.logonUser = undefined;
            $rootScope.user = undefined;
            $scope.isStudent = undefined;
            $scope.isLandlord = undefined;
            $scope.isAdmin = undefined;
            $location.path('/home');
        }

        $rootScope.$on('$locationChangeSuccess', routeChanged);
        function routeChanged(evt, newUrl, oldUrl) {
            //$scope.userType = $sessionStorage.userType;
            //$scope.displayName = $sessionStorage.displayName;
            if ($sessionStorage.logonUser) {
                $scope.userAuthenticated = true;
                if ($sessionStorage.logonUser.userType == 'student') {
                    $scope.isStudent = true;
                }
                else if ($sessionStorage.logonUser.userType == "landlord") {
                    $scope.isLandlord = true;
                } else {
                    $scope.isAdmin = true;
                }
            } else {
                $scope.userAuthenticated = false;
            }
        }

    }

    angular.module('COMSTU').controller('indexController', indexController);
    indexController.$inject = ['$location', '$sessionStorage', '$scope', '$rootScope'];
})();
