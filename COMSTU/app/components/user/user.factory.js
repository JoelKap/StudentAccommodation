(function () {
    'use strict';

    function UserFactory($http, $q, baseUrl) {       
        $http.defaults.headers.common['Cache-Control'] = 'no-cache';
        $http.defaults.headers.common['Pragma'] = 'no-cache';
        var getUsers = function () {
            var defered = $q.defer();

            var getUsersComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/User/GetUsers').then(getUsersComplete, function (err, status) {
                    defered.reject(err);
                });

            return defered.promise; 
        }

        var addUser = function (user) {
            var defered = $q.defer();

            var addUserComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/User/CreateUser', user).then(addUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var editUser = function (user) {
            var defered = $q.defer();

            var editUserComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(baseUrl + '/User/UpdateUser', user).then(editUserComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var resetUserPassword = function (userId, password) {

            var obj = {
                userId: userId,
                password: password,
            }
            var defered = $q.defer();

            var resetUserPasswordComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(baseUrl + '/User/ResetUserPassword', obj).then(resetUserPasswordComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }


        var sendUserDetails = function (userId) {

           
            var defered = $q.defer();

            var sendUserDetailsComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(baseUrl + '/User/sendUserDetails', { userID: userId }).then(sendUserDetailsComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }



        var checkUniqueUsername = function (username) {
            var defered = $q.defer();

            var checkUniqueUsernameComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(baseUrl + '/User/CheckUniqueUsername', { username: username }).then(checkUniqueUsernameComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
        return {
            getUsers: getUsers,
            addUser: addUser,
            editUser: editUser,
            resetUserPassword: resetUserPassword,
            checkUniqueUsername: checkUniqueUsername,
            sendUserDetails: sendUserDetails
        }
    }

    angular.module('AMApp').factory('UserFactory', UserFactory);
    UserFactory.$inject = ['$http', '$q', 'baseUrl'];
})();