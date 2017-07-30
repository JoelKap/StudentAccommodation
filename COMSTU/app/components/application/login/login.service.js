(function () {
    'use strict';

    function LoginService($http, $q, baseUrl, $sessionStorage, jwtHelper, tokenServiceUrl) {

        var self = this;
        self.loggedUser;
        var userModel = {};

        this.loginUser = function (user) {
            var defered = $q.defer();

            var addUserComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/LogIn/login/?username=' + user.username + '&password=' + user.password).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.loggedOnUser = function (isLoggedOn) {
            $sessionStorage.loggedUser = isLoggedOn;
        }

        this.getLogOnUser = function () {
            return $sessionStorage.loggedUser;
        }

        this.registerUser = function (user) {
            var defered = $q.defer();

            userModel = {
                username: user.username,
                email: user.email,
                password: user.password,
                Repeatpassword: user.Repeatpassword,
                packagedescription: user.packagedescription
        }

            var addUserComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/LogIn/createUser', userModel).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.recoverPassword = function (email) {
            var defered = $q.defer();
            var passwordRecoveredComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/LogIn/GetPasswordRecovery?email=' + email)
                .then(passwordRecoveredComplete, function (err, status) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        this.checkUserAuthentication = function () {
            return $sessionStorage.isPermissionLoaded;
        }

    }

    angular.module('AMApp').service('LoginService', LoginService);
    LoginService.$inject = ['$http', '$q', 'baseUrl', '$sessionStorage', 'jwtHelper', 'tokenServiceUrl'];
})();