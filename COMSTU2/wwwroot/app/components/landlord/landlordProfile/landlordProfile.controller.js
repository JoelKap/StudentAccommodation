(function () {
    'use strict';

    function landlordProfileController($location, homeServices, $sessionStorage, studentService, toastr) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'landlordProfile';
        vm.user = {};
        vm.hasAccommodation = false;

        init();

        function init() {
            vm.accommodation = homeServices.getAssignedAccommodation();
            if (vm.accommodation != undefined) {
                vm.hasAccommodation = true;
            }

            if (!$sessionStorage.logonUser) {
                $location.path('/home');
            } else {
                vm.user = $sessionStorage.logonUser;
            }
        }


        vm.updateUserInfo = function (user) {
            studentService.updateProfile(user).then(function (result) {
                if (result) {
                    $sessionStorage.logonUser = result;
                    toastr.success('Update successfully');
                    vm.user = {};
                }
            })
        }
    }

    angular.module('COMSTU').controller('landlordProfileController', landlordProfileController);
    landlordProfileController.$inject = ['$location', 'homeServices', '$sessionStorage', 'studentService', 'toastr'];
})();
