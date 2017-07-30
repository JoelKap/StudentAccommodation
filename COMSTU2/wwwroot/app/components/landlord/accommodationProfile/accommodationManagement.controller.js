(function () {
    'use strict';

    function accommodationManagementController($location, studentService, $window, toastr, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'accommodationManagement';
        vm.acc = {};
        vm.city = "";
        vm.houseType = "";
        vm.isActive = "";
        vm.location = "";
        vm.isClicked = false;

        init();

        function init() { }

        vm.createAcc = function (accommodation) {
            vm.isClicked = true;
            if (vm.makeActiveNow == 'Yes') {
                var amount = "30.00";
                studentService.getHashedKey(amount).then(function (data) {
                    var obj = {
                        SID_MERCHANT: 'COMSTU',
                        SID_CURRENCY: 'ZAR',
                        SID_COUNTRY: 'ZA',
                        SID_REFERENCE: data.Reference,
                        SID_AMOUNT: "30.00",
                        SID_CONSISTENT: data.FinalKey
                    }

                    var str = 'https://www.sidpayment.com/paySID?SID_MERCHANT=' + obj.SID_MERCHANT
                        + '&SID_CURRENCY=' + obj.SID_CURRENCY
                        + '&SID_COUNTRY=' + obj.SID_COUNTRY
                        + '&SID_REFERENCE=' + obj.SID_REFERENCE
                        + '&SID_AMOUNT=' + obj.SID_AMOUNT
                        + '&SID_CONSISTENT=' + obj.SID_CONSISTENT;

                    $window.open(str, "_blank");

                    setTimeout(function () {
                        studentService.CheckPaymentStatus(obj).then(function (result) {
                            if (result.Status == 'COMPLETED') {
                                //Register User
                                var f = document.getElementById('file').files[0];
                                //var f1 = document.getElementById('file1').files[0];
                                //var f2 = document.getElementById('file2').files[0];
                                //var f3 = document.getElementById('file3').files[0];
                                var size = f.size;
                                if (size > 1000000 && size < 8000000) {
                                    if (f != undefined) {
                                        var r = new FileReader();
                                        r.onloadend = function (e) {
                                            var data = e.target.result;
                                            accommodation.pictures = data;
                                            accommodation.Description = vm.description;
                                            accommodation.Name = vm.location;
                                            accommodation.userId = $sessionStorage.logonUser.userId;
                                            accommodation.isMakeActiveNow = 'Yes';
                                            studentService.createUserAccommodation(accommodation).then(function (result) {
                                                if (result) {
                                                    toastr.success('Saved successfully');
                                                    //Clear previous records
                                                    vm.acc = {};
                                                }
                                            })
                                        }
                                        r.readAsDataURL(f);
                                        //r.readAsDataURL(f2);
                                        //r.readAsDataURL(f3);
                                        //r.readAsDataURL(f4);
                                    }
                                }
                                else {
                                    toastr.error('Wrong size  is incorrect :' + " " + size + " " + 'Please upload a quality picture');

                                }

                            } else {
                                toastr.error('Transaction Failed');
                                $location.path('/unsuccessfullCheckOut');
                            }
                        })
                    }, 5000);

                });
            } else {
                var f = document.getElementById('file').files[0];
                //var f1 = document.getElementById('file1').files[0];
                //var f2 = document.getElementById('file2').files[0];
                //var f3 = document.getElementById('file3').files[0];
                var size = f.size;
                //if (size > 1000000 && size < 8000000) {
                    if (f != undefined) {
                        var r = new FileReader();
                        r.onloadend = function (e) {
                            var data = e.target.result;
                            accommodation.pictures = data;
                            accommodation.Description = vm.description;
                            accommodation.Name = vm.location;
                            accommodation.userId = $sessionStorage.logonUser.userId;
                            accommodation.isMakeActiveNow = 'No';
                            studentService.createUserAccommodation(accommodation).then(function (result) {
                                if (result) {
                                    toastr.success('Saved successfully');
                                    //Clear previous records
                                    vm.acc = {};
                                }
                            })
                        }
                        r.readAsDataURL(f);
                        //r.readAsDataURL(f2);
                        //r.readAsDataURL(f3);
                        //r.readAsDataURL(f4);
                    }
               // }
                else {
                    toastr.error('Wrong size  is incorrect :' + " " + size + " " + 'Please upload a quality picture');
                }
            }
        }

        vm.updateUserInfo = function (user) {
            userProfileService.updateProfile(user).then(function (result) {
                if (result) {
                    sessionStorage.logonUser = result;
                    toastr.success('Update successfully');
                    var landingUrl = "http://" + $window.location.host + "/userProfile.html";
                    $window.location.href = landingUrl;
                }
            })
        }

        vm.selectedCity = function (item) {
            vm.location = item;
        }

        vm.selectedHouseType = function (item) {
            vm.description = item;
        }

        vm.selectedMakeActive = function (item) {
            vm.makeActiveNow = item;
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

    angular.module('COMSTU').controller('accommodationManagementController', accommodationManagementController);
    accommodationManagementController.$inject = ['$location', 'studentService', '$window', 'toastr', '$sessionStorage'];
})();
