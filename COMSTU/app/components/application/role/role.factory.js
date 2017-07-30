(function () {
    'use strict';



    function roleFactory($http, $q, baseUrl, $rootScope) {

        var addRole = function (role) {
            var defered = $q.defer();
            var addRoleDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/addRole', role)
            .then(addRoleDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }


        var editRole = function (role) {
            var defered = $q.defer();
            var editRoleDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/editRole', role)
            .then(editRoleDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }


        var deleteRole = function (role) {
            var defered = $q.defer();
            var deleteRoleDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/deleteRole', role)
            .then(deleteRoleDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getRoles = function (applicationId) {
            var defered = $q.defer();

            var getRolesDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/getRoles', applicationId).then(getRolesDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
        return {
            addRole: addRole,
            editRole: editRole,
            deleteRole: deleteRole,
            getRoles: getRoles,
           
        }

    }


    angular.module('AMApp').factory('roleFactory', roleFactory);
    roleFactory.$inject = ['$http', '$q', 'baseUrl', '$rootScope'];
})();