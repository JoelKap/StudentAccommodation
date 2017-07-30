(function () {
    'use strict';



    function adminServices($http, $q, baseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'admin';

        this.getAccommodations = function () {

            var defered = $q.defer();
            var getAccComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Accommodation/GetAccommodationForAdmin').then(getAccComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.activateAcc = function (acc) {

            var defered = $q.defer();

            var activateComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Accommodation/Activate/?AccommodationId=' + acc.accommodationId).then(activateComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getUsersToPay = function () {

            var defered = $q.defer();
            var getAccComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/User/GetUsersToPayForAdmin').then(getAccComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.payUser = function (user) {

            var defered = $q.defer();
            var payComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/User/PayUser', user).then(payComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
    }

    angular.module('COMSTU').service('adminServices', adminServices);
    adminServices.$inject = ['$http', '$q', 'baseUrl', '$sessionStorage'];
})();
