(function () {
    'use strict';



    function registrationLandlordController($location, $scope, userProfileService, toastr, $sessionStorage, $window) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'registrationLandlord';
        $scope.isClicked = false;
        $scope.hasAccommodation = false;
        $scope.userl = {};
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
                if ($sessionStorage.logonUser) {
                    $scope.user = $sessionStorage.logonUser;
                }
            }
        }

        $scope.register = function (user) {
            user.userType = 'landlord';
            user.studentId = $sessionStorage.logonUser.userId;
            $scope.isClicked = true;
            //Do Payment first then registered the landlord unto the system
            var amount = "250.00";
            userProfileService.getHashedKey(amount).then(function (data) {
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
                    userProfileService.CheckPaymentStatus(obj).then(function (result) {
                        if (result.Status == 'COMPLETED') {
                            //Register User
                            userProfileService.studentRegisterll(user).then(function (result) {
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
                            var landingUrl = "http://" + $window.location.host + "/checkOutPageFailure.html";
                            $window.location.href = landingUrl;
                        }
                    })
                }, 5000);
            });
        }
    }

    angular.module('AMApp').controller('registrationLandlordController', registrationLandlordController);
    registrationLandlordController.$inject = ['$location', '$scope', 'userProfileService', 'toastr', '$sessionStorage', '$window'];
})();
