(function () {
    'use strict';



    function loginController($location, loginService, homeServices, toastr, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'login';
        vm.hasSelectedAcc = {};

        init();

        function init() {
            vm.hasSelectedAcc = homeServices.getAssignedAccommodation();
        }

        vm.login = function (email, password) {
            loginService.login(email, password).then(function (result) {
                if (result) {
                    if (result.userType == 'landlord') {
                        toastr.success('Login successfully');
                        $location.path('/accommodationManagement');
                    }
                    else if (result.userType == 'student') {
                        if (vm.hasSelectedAcc.name != undefined) {
                            $location.path('/bookAccommodation');
                        }
                        else {
                            $location.path('/registerLandlord');
                        }
                    }
                    else {
                        $location.path('/adminAccountManagement');
                    }
                } else {
                    toastr.error('Failed, Incorect email or password');
                }
            })
        }
    }
    angular.module('COMSTU').controller('loginController', loginController);
    loginController.$inject = ['$location', 'loginService', 'homeServices', 'toastr', '$scope'];
})();
