(function () {
    'use strict';



    function registrationController($location, $scope, registrationService, $window, toastr, $sessionStorage, userProfileService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'registration';
        $scope.isStudent = false;
        $scope.isLandlord = false;
        $scope.isClicked = false;
        $scope.userType = "";
        $scope.user = {};
        $sessionStorage.logonUser = undefined;
        init();
        function init() {

        }

        $scope.register = function (user) {
            user.userType = $scope.userType;
            $scope.isClicked = true;

            //Pay when registering landlord
            if (user.userType == "landlord") {
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

                   // $window.open(str, "_self");
                    $window.open(str, "_blank");

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

                })

            } else {

                //Register Student
                registrationService.registerUser(user).then(function (result) {
                    if (result) {
                        toastr.success('Registration successfully');
                        $scope.user = {};
                        setTimeout(function () {
                            var landingUrl = "http://" + $window.location.host + "/login.html";
                            $window.location.href = landingUrl;
                        }, 3000);

                    }
                    else {
                        var landingUrl = "http://" + $window.location.host + "/register.html";
                        $window.location.href = landingUrl;
                        toastr.error('Error registering user, Cellphone number or Email already exist!');
                        $scope.user = {};
                    }
                });
            }
        }

        $scope.selectedItem = function (userType) {
            if (userType == 'student') {
                $scope.isStudent = true;
                $scope.isLandlord = false;
                $scope.userType = "student";
            }
            if (userType == 'landlord') {
                $scope.isLandlord = true;
                $scope.isStudent = false;
                $scope.userType = "landlord";
            }
        }

        $scope.login = function (email, password) {
            registrationService.login(email, password).then(function (result) {
                if (result) {
                    if (result.userType == 'landlord') {
                        toastr.success('Login successfully');

                        var landingUrl = "http://" + $window.location.host + "/userProfile.html";
                        $window.location.href = landingUrl;
                    }
                    else if (result.userType == 'student') {
                        if ($sessionStorage.userSelectedAcc) {
                            var landingUrl = "http://" + $window.location.host + "/bookAccommodation.html";
                            $window.location.href = landingUrl;
                        }
                        else {
                            var landingUrl = "http://" + $window.location.host + "/registrationll.html";
                            $window.location.href = landingUrl;
                        }
                    }
                    else {
                        var landingUrl = "http://" + $window.location.host + "/adminAccommodationManagement.html";
                        $window.location.href = landingUrl;
                    }


                } else {
                    toastr.error('Failed, Incorect email or password');
                }
            })
        }
    }

    angular.module('AMApp').controller('registrationController', registrationController);
    registrationController.$inject = ['$location', '$scope', 'registrationService', '$window', 'toastr', '$sessionStorage', 'userProfileService'];
})();
