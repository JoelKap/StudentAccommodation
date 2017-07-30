(function () {
    'use strict';



    function accommodationDetailController($location, accommodationServices, $scope, $window, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'accommodationDetail';
        $scope.accommodation = {};
        init();

        function init() {
            $scope.accommodation = accommodationServices.getAssignedAccommodation();
            if ($scope.accommodation == undefined) {
                var landingUrl = "http://" + $window.location.host + "/availableAccomodation.html";
                $window.location.href = landingUrl;
            }
        }

        $scope.bookForViewing = function (acc) {
            acc.pictures = undefined;
            $sessionStorage.userSelectedAcc = acc;
            var landingUrl = "http://" + $window.location.host + "/login.html";
            $window.location.href = landingUrl;
        };
    }

    angular.module('AMApp').controller('accommodationDetailController', accommodationDetailController);
    accommodationDetailController.$inject = ['$location', 'accommodationServices', '$scope', '$window', '$sessionStorage'];
})();
