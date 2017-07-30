(function () {
    'use strict';



    function accommodationController($location, $scope, accommodationServices, $window) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'accommodation';
        $scope.accommodations = [];
        init();

        function init() {
         
            //Get Acc
            homeServices.getAccomodations().then(function (data) {
                if (data.length > 0) {
                    $scope.accommodations = data;
                }
            });
        }

        $scope.loadingData = function () {
            init();
        }


        $scope.viewDetails = function (accommodation) {
            accommodationServices.assignAccommodation(accommodation);
            var landingUrl = "http://" + $window.location.host + "/accommodationDetails.html";
            $window.location.href = landingUrl;
        }

        //$scope.selectedCity = function (item) {
        //    alert('item' + JSON.stringify(item.singleSelect));
        //}
        //$scope.selectedHouseType = function (item) {
        //    alert(JSON.stringify(item));
        //}
    }

    angular.module('AMApp').controller('accommodationController', accommodationController);
    accommodationController.$inject = ['$location', '$scope', 'accommodationServices', '$window'];
})();
