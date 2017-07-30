(function () {
    'use strict';



    function adminAccommodationManagementController($scope, $location, adminServices, $sessionStorage, $window) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'adminAccommodationManagement';
        $scope.accommodations = [];
        $scope.users = [];
        $scope.isClicked = false;
        $scope.shouldPayUser = false;
        init();

        function init() {
            adminServices.getAccommodations().then(function (result) {
                if (result.length > 0) {
                    $scope.accommodations = result;
                } else {
                    //message not found
                    toastr.info('No Accommodations found to activate');
                    $scope.accommodations = [];
                }
            });

            adminServices.getUsersToPay().then(function (results) {
                if (results.length > 0) {
                    results.forEach(function (item) {
                        if (item.shouldBePaid == 'No') {
                            $scope.shouldPayUser = true;
                        }
                    })
                    $scope.users = results;
                } else {
                    toastr.info('No Users found to pay');
                }
            })

            if (!$sessionStorage.logonUser) {
                var landingUrl = "http://" + $window.location.host + "/index.html";
                $window.location.href = landingUrl;
            }
            else {
                $scope.user = $sessionStorage.logonUser;
            }

        }

        $scope.activateAccommodation = function (acc) {
            adminServices.activateAcc(acc).then(function (result) {
                if (result) {
                    toastr.success('Activated successfully');
                    $scope.isClicked = true;
                    setTimeout(function () {
                        init();
                    }, 4000);
                }
                else {
                    //message not activated
                    toastr.error('Error activating accommodation, Please contact system admin');
                }
            })
        }

        $scope.payUser = function (user) {
            adminServices.payUser(user).then(function (result) {
                if (result) {
                    toastr.success('User paid successfully, Please proceed with online payment');
                    init();
                } else {
                    toastr.error('Error activating accommodation, Please contact system admin');
                }
            })
        }
    }

    angular.module('AMApp').controller('adminAccommodationManagementController', adminAccommodationManagementController);
    adminAccommodationManagementController.$inject = ['$scope', '$location', 'adminServices', '$sessionStorage', '$window'];
})();
