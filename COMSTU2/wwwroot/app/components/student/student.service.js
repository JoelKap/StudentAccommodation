(function () {
    'use strict';



    function studentService($http, $q, baseUrl, $sessionStorage, $window) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'userProfile';

        this.createUserAccommodation = function (accommodation) {

            var defered = $q.defer();

            var addUserComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/Accommodation/CreateUserAccommodation', accommodation).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.updateProfile = function (user) {
            var defered = $q.defer();
            var addUserComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/User/UpdateUserInfo', user).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.bookThisAccommodation = function (acc) {
            var defered = $q.defer();
            var addUserComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/User/BookThisAcc', acc).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
        this.payForBooking = function (obj) {

            var defered = $q.defer();
            var payBookingComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/User/BookThisAcc', obj).then(payBookingComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;

        }

        this.CheckPaymentStatus = function (obj) {

            var trans = {
                MERCHANT: obj.SID_MERCHANT,
                CURRENCY: obj.SID_CURRENCY,
                COUNTRY: obj.SID_COUNTRY,
                REFERENCE: obj.SID_REFERENCE,
                AMOUNT: obj.SID_AMOUNT
            }

            var defered = $q.defer();
            var webServiceComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/User/GetTransactionStatus', trans).then(webServiceComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getHashedKey = function (data) {

            //Get Hashed Key
            var req = {
                MERCHANT: 'COMSTU',
                CURRENCY: 'ZAR',
                COUNTRY: 'ZA',
                AMOUNT: data
            }
            var defered = $q.defer();
            var payBookingComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/User/GetConsistentKey', req).then(payBookingComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.studentRegisterll = function (user) {
            var defered = $q.defer();

            var addUserComplete = function (response) {

                defered.resolve(response.data);
            } 

            $http.post(baseUrl + '/Ladlord/StudentRegisterll', user).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
         

        this.getUserAccount = function (guidId) {
            var defered = $q.defer();

            var addUserComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/User/GetUserAccount/?guidId=' + guidId).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
    }

    angular.module('COMSTU').service('studentService', studentService);
    studentService.$inject = ['$http', '$q', 'baseUrl', '$sessionStorage', '$window'];
})();
