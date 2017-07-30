(function () {
    'use strict';

    function studentAccountController($location, $sessionStorage, studentService, homeServices) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'studentAccount';
        vm.hasAccommodation = false;
        vm.accommodation = {};
        vm.accountDetails = {};
        vm.user = {};

        init();

        function init() {

            vm.accommodation = homeServices.getAssignedAccommodation();
            if (vm.accommodation != undefined) {
                vm.hasAccommodation = true;
            }

            if (!$sessionStorage.logonUser) {
                $location.path('/home');
            }
            else {
                studentService.getUserAccount($sessionStorage.logonUser.userId).then(function (result) {
                    if (result) {
                        vm.accountDetails = result;
                    }
                });
            }
            if ($sessionStorage.logonUser) {
                vm.user = $sessionStorage.logonUser;
            }
        }
    }

    angular.module('COMSTU').controller('studentAccountController', studentAccountController);
    studentAccountController.$inject = ['$location', '$sessionStorage', 'studentService', 'homeServices'];
})();
