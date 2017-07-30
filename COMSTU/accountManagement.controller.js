(function () {
    'use strict';



    function accountManagementController($location, $scope, $sessionStorage, userProfileService, $window) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'accountManagement';
        $scope.accountDetails = {};
        $scope.hasAccommodation = false;
        init();

        function init() {

            if ($sessionStorage.userSelectedAcc) {
                //Display Accommodation to book
                $scope.hasAccommodation = true;
                $scope.accommodation = $sessionStorage.userSelectedAcc;
            }

            if (!$sessionStorage.logonUser) {
                var landingUrl = "http://" + $window.location.host + "/index.html";
                $window.location.href = landingUrl;
            }
            else {
                userProfileService.getUserAccount($sessionStorage.logonUser.userId).then(function (result) {
                    if (result) {
                        $scope.accountDetails = result;
                    }
                });
            }
            if ($sessionStorage.logonUser) {
                $scope.user = $sessionStorage.logonUser;
            }
        }
    }

    angular.module('AMApp').controller('accountManagementController', accountManagementController);
    accountManagementController.$inject = ['$location', '$scope', '$sessionStorage', 'userProfileService', '$window'];

})();
