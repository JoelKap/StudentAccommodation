(function () {
    'use strict';



    function homeController($location, homeServices) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'home';
        vm.accommodations = [];

        init();

        function init() {
            homeServices.getAccomodations().then(function (data) {
                if (data.length > 0) {
                    vm.accommodations = data;
                }
            });
        }
        vm.navigateTo = function (url) {
            $location.path(url);
        }

        vm.viewDetails = function (accommodation) {
            homeServices.assignAccommodation(accommodation);
            $location.path('/homeDetail')
        }


    }
    angular.module('COMSTU').controller('homeController', homeController);
    homeController.$inject = ['$location', 'homeServices'];
})();
