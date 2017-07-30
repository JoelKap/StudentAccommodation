(function () {
    'use strict';

    function registerlandlordController($location, $sessionStorage, studentService, homeServices, toastr, $window) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'registerlandlord';
        vm.hasAccommodation = false;
        vm.accommodation = {};
        vm.user = {};
        vm.userl = {};
        vm.isClicked = false;

        init();

        function init() {

            vm.accommodation = homeServices.getAssignedAccommodation();
            if (vm.accommodation.name != undefined) {
                vm.hasAccommodation = true;
            }

            if (!$sessionStorage.logonUser) {
                $location.path('/home');
            }
            else {
                if ($sessionStorage.logonUser) {
                    vm.user = $sessionStorage.logonUser;
                }
            }
        }

        vm.register = function (user) {

            user.userType = 'landlord';
            user.studentId = $sessionStorage.logonUser.userId;
            vm.isClicked = true;
            //Do Payment first then registered the landlord unto the system
            var amount = "250.00";
            studentService.getHashedKey(amount).then(function (data) {
                var obj = {
                    SID_MERCHANT: 'COMSTU',
                    SID_CURRENCY: 'ZAR',
                    SID_COUNTRY: 'ZA',
                    SID_REFERENCE: data.Reference,
                    SID_AMOUNT: "250.00",
                    SID_CONSISTENT: data.FinalKey
                }

                var str = 'https://www.sidpayment.com/paySID?SID_MERCHANT=' + obj.SID_MERCHANT
                    + '&SID_CURRENCY=' + obj.SID_CURRENCY
                    + '&SID_COUNTRY=' + obj.SID_COUNTRY
                    + '&SID_REFERENCE=' + obj.SID_REFERENCE
                    + '&SID_AMOUNT=' + obj.SID_AMOUNT
                    + '&SID_CONSISTENT=' + obj.SID_CONSISTENT;

                $window.open(str, "_self");
                // $window.open(str, "_blank");

                setTimeout(function () {
                    studentService.CheckPaymentStatus(obj).then(function (result) {
                        if (result.Status == 'COMPLETED') {
                            //Register User
                            studentService.studentRegisterll(user).then(function (result) {
                                $scope.isClicked = false;
                                if (result) {
                                    toastr.success('Registration successfull');
                                    $scope.userl = {};
                                }
                                else {
                                    toastr.error('Error, registering land lord!');
                                }
                            });

                        } else {
                            toastr.error('Transaction Failed');
                            $location.path('/unsuccessfullCheckOut');
                        }
                    })
                }, 5000);
            });
        }
    }

    angular.module('COMSTU').controller('registerlandlordController', registerlandlordController);
    registerlandlordController.$inject = ['$location', '$sessionStorage', 'studentService', 'homeServices', 'toastr', '$window'];
})();
