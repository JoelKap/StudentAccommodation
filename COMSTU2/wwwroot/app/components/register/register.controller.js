(function () {
    'use strict';

    function registerController($location, toastr, $window, studentService, registrationService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'register';
        vm.isClicked = false;
        vm.userType = "";
        vm.user = {};

        init();

        function init() { }

        vm.register = function (user) {
            user.userType = vm.userType;
            vm.isClicked = true;

            //Pay when registering landlord
            if (user.userType == "landlord") {
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

                    // $window.open(str, "_self");
                    $window.open(str, "_blank");

                    setTimeout(function () {
                        studentService.CheckPaymentStatus(obj).then(function (result) {
                            if (result.Status == 'COMPLETED') {
                                //Register User
                                studentService.studentRegisterll(user).then(function (result) {
                                    vm.isClicked = false;
                                    if (result) {
                                        toastr.success('Registration successfull');
                                        vm.userl = {};
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

                })

            } else {

                //Register Student
                registrationService.registerUser(user).then(function (result) {
                    if (result) {
                        toastr.success('Registration successfully');
                        vm.user = {};
                        setTimeout(function () {
                            $location.path('/home');
                        }, 3000);

                    }
                    else {
                        $location.path('/home');
                        toastr.error('Error registering user, Cellphone number or Email already exist!');
                        vm.user = {};
                    }
                });
            }
        }

        vm.selectedItem = function (userType) {
            if (userType == 'student') {
                vm.isStudent = true;
                vm.isLandlord = false;
                vm.userType = "student";
            }
            if (userType == 'landlord') {
                vm.isLandlord = true;
                vm.isStudent = false;
                vm.userType = "landlord";
            }
        }
    }

    angular.module('COMSTU').controller('registerController', registerController);
    registerController.$inject = ['$location', 'toastr', '$window', 'studentService', 'registrationService'];
})();
