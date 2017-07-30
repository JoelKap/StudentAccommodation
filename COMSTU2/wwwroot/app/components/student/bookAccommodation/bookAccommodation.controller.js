(function () {
    'use strict';



    function bookAccommodationController($location, studentService, $sessionStorage, homeServices, $window, toastr) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'bookAccommodation';
        vm.accommodation = {};
        vm.hasAccommodation = false;

        vm.user = {};
        init();

        function init() {

            vm.accommodation = homeServices.getAssignedAccommodation();
            if (vm.accommodation.name != undefined) {
                vm.hasAccommodation = true;
            } else {
                toastr.info('No accommodation has been booked');
               // $location.path('/studentProfile')
            }

            if (!$sessionStorage.logonUser) {
                $location.path('/home');
            } else {
                vm.user = $sessionStorage.logonUser;
            }
        }


        vm.bookThisAccommodation = function (acc) {

            var amount = "5.00";
            studentService.getHashedKey(amount).then(function (data) {
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
                        studentService.CheckPaymentStatus(obj).then(function (result) {
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
                                studentService.payForBooking(obj).then(function (result) {
                                    if (result) {
                                        $sessionStorage.userSelectedAcc = undefined;
                                        toastr.success('Transaction successfully completed');
                                        $location.path('/successfullCheckOut');
                                    }
                                })
                            } else {
                                toastr.error('Transaction Failed');
                                $location.path('/unsuccessfullCheckOut')
                            }
                        })
                    }, 5000);
                }
            });
        }
    }

    angular.module('COMSTU').controller('bookAccommodationController', bookAccommodationController);
    bookAccommodationController.$inject = ['$location', 'studentService', '$sessionStorage', 'homeServices', '$window', 'toastr'];
})();
