(function () {
    'use strict';

    function bookAccController($location, $scope, $sessionStorage, userProfileService, toastr, $window) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'bookAcc';
        $scope.accommodation = {};
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
            } else {
                $scope.user = $sessionStorage.logonUser;
            }
        }

        $scope.bookThisAccommodation = function (acc) {
            var amount = "5.00";
            userProfileService.getHashedKey(amount).then(function (data) {
                if (data) {

                    var obj = {
                        SID_MERCHANT: 'COMSTU',
                        SID_CURRENCY: 'ZAR',
                        SID_COUNTRY: 'ZA',
                        SID_REFERENCE: data.Reference,
                        SID_AMOUNT: "5.00",
                        SID_CONSISTENT: data.FinalKey
                    }
                    var str = 'https://www.sidpayment.com/paySID?SID_MERCHANT=' + obj.SID_MERCHANT
                                                            + '&SID_CURRENCY=' + obj.SID_CURRENCY
                                                            + '&SID_COUNTRY=' + obj.SID_COUNTRY
                                                            + '&SID_REFERENCE=' + obj.SID_REFERENCE
                                                            + '&SID_AMOUNT=' + obj.SID_AMOUNT
                                                            + '&SID_CONSISTENT=' + obj.SID_CONSISTENT;
                    //$window.open(str, "_self");
                    $window.open(str, "_blank");
                    //COMPLETED
                    //result.Status == 'CREATED' || result.Status == 'READY'
                    setTimeout(function () {
                        userProfileService.CheckPaymentStatus(obj).then(function (result) {
                            if (result.Status == 'COMPLETED') {
                                obj.dateCreated = result.Date_Created;
                                obj.ReceiptNo = result.ReceiptNo;
                                obj.transactionId = result.TnxID;
                                obj.userBookingId = $sessionStorage.logonUser.userId;
                                obj.AccommodationId = $sessionStorage.accommodation.AccommodationId;
                                obj.Address = $sessionStorage.accommodation.Address;
                                obj.Comment = $sessionStorage.accommodation.Comment;
                                obj.DateCreated = $sessionStorage.accommodation.DateCreated;
                                obj.DateExpired = $sessionStorage.accommodation.DateExpired;
                                obj.Description = $sessionStorage.accommodation.Description;
                                obj.hasPaid = $sessionStorage.accommodation.hasPaid;
                                obj.isActive = $sessionStorage.accommodation.isActive;
                                obj.isBooked = $sessionStorage.accommodation.isBooked;
                                obj.Name = $sessionStorage.accommodation.Name;
                                obj.pictures = $sessionStorage.accommodation.pictures;
                                obj.price = $sessionStorage.accommodation.price;
                                obj.UserId = $sessionStorage.accommodation.UserId;
                                obj.userBookingId = $sessionStorage.accommodation.UserId;
                                userProfileService.payForBooking(obj).then(function (result) {
                                    if (result) {
                                        $sessionStorage.userSelectedAcc = undefined;
                                        toastr.success('Transaction successfully completed');
                                        var landingUrl = "http://" + $window.location.host + "/checkOutPageSuccess.html";
                                        $window.location.href = landingUrl;
                                    }
                                })
                            } else {
                                toastr.error('Transaction Failed');
                                var landingUrl = "http://" + $window.location.host + "/checkOutPageFailure.html";
                                $window.location.href = landingUrl;
                            }
                        })
                    }, 5000);
                }
            });
        }

        $scope.updateUserInfo = function (user) {
            userProfileService.updateProfile(user).then(function (result) {
                if (result) {
                    sessionStorage.logonUser = result;
                    toastr.success('Update successfully');
                    var landingUrl = "http://" + $window.location.host + "/registrationll.html";
                    $window.location.href = landingUrl;
                }
            })
        }
    }

    angular.module('AMApp').controller('bookAccController', bookAccController);
    bookAccController.$inject = ['$location', '$scope', '$sessionStorage', 'userProfileService', 'toastr', '$window'];
})();
