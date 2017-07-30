(function () {
    'use strict';



    function studentProfileController($location, studentService, toastr, $sessionStorage, homeServices) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'studentProfile';

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
                    $location.path('/studentAccount')
                    vm.user = {};
                }
            })
        }
    }

    angular.module('COMSTU').controller('studentProfileController', studentProfileController);
    studentProfileController.$inject = ['$location', 'studentService', 'toastr', '$sessionStorage', 'homeServices'];
})();
