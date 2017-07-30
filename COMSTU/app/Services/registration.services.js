(function () {
    'use strict';

    function registrationService($http, $q, baseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var self = this;
     
        this.registerUser = function (user) {
            var defered = $q.defer();

            var addUserComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/User/CreateUser', user).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.login = function (email, password) {
            var defered = $q.defer();

            var addUserComplete = function (response) {
                $sessionStorage.logonUser = response.data;
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/User/Login/?email=' + email + '&password=' + password).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

    }

    angular.module('AMApp').service('registrationService', registrationService);
    registrationService.$inject = ['$http', '$q', 'baseUrl', '$sessionStorage'];
})();
