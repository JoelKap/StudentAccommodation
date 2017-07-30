(function () {
    'use strict';



    function userProfileController($location, $scope, userProfileService, toastr, $sessionStorage, $window) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'userProfile';
        $scope.description = {};
        $scope.location = {};
        $scope.acc = {};
        $scope.name = '';

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

            if ($sessionStorage.logonUser) {
                $scope.user = $sessionStorage.logonUser;
            }

        };

        $scope.createAcc = function (accommodation) {

            if ($scope.makeActiveNow == 'Yes') {
                var amount = "30.00";
                userProfileService.getHashedKey(amount).then(function (data) {
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
                        userProfileService.CheckPaymentStatus(obj).then(function (result) {
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
                                            accommodation.Description = $scope.description;
                                            accommodation.Name = $scope.location;
                                            accommodation.userId = $sessionStorage.logonUser.userId;
                                            accommodation.isMakeActiveNow = 'Yes';
                                            userProfileService.createUserAccommodation(accommodation).then(function (result) {
                                                if (result) {
                                                    toastr.success('Saved successfully');
                                                    //Clear previous records
                                                    $scope.acc = {};
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
                                var landingUrl = "http://" + $window.location.host + "/checkOutPageFailure.html";
                                $window.location.href = landingUrl;
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
                if (size > 1000000 && size < 8000000) {
                    if (f != undefined) {
                        var r = new FileReader();
                        r.onloadend = function (e) {
                            var data = e.target.result;
                            accommodation.pictures = data;
                            accommodation.Description = $scope.description;
                            accommodation.Name = $scope.location;
                            accommodation.userId = $sessionStorage.logonUser.userId;
                            accommodation.isMakeActiveNow = 'No';
                            userProfileService.createUserAccommodation(accommodation).then(function (result) {
                                if (result) {
                                    toastr.success('Saved successfully');
                                    //Clear previous records
                                    $scope.acc = {};
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
            }
        }

        $scope.updateUserInfo = function (user) {
            userProfileService.updateProfile(user).then(function (result) {
                if (result) {
                    sessionStorage.logonUser = result;
                    toastr.success('Update successfully');
                    var landingUrl = "http://" + $window.location.host + "/userProfile.html";
                    $window.location.href = landingUrl;
                }
            })
        }

        $scope.selectedCity = function (item) {
            $scope.location = item;
        }

        $scope.selectedHouseType = function (item) {
            $scope.description = item;
        }

        $scope.selectedMakeActive = function (item) {
            $scope.makeActiveNow = item;
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
    }

    angular.module('AMApp').controller('userProfileController', userProfileController);
    userProfileController.$inject = ['$location', '$scope', 'userProfileService', 'toastr', '$sessionStorage', '$window'];
})();
