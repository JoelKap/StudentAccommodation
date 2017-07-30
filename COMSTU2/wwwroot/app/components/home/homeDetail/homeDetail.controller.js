(function () {
    'use strict';



    function homeDetailController($location, $sessionStorage, homeServices) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'homeDetail';
        vm.accommodation = {};

        init();

        function init() {
            vm.accommodation = homeServices.getAssignedAccommodation();
            if (vm.accommodation.pictures == undefined) {
                $location.path('/home');
            }
        }

        vm.bookForViewing = function (acc) {
            if ($sessionStorage.logonUser == undefined) {
                $location.path('/login');
            } else {
                $location.path('/bookAccommodation')
            }
        };
    }

    angular.module('COMSTU').controller('homeDetailController', homeDetailController);
    homeDetailController.$inject = ['$location', '$sessionStorage', 'homeServices'];
})();
