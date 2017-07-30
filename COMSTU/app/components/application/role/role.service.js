(function () {
    'use strict';



    function roleService($http, $q, baseUrl, $rootScope) {


        var currentRole = {};

        var getCurrentRole = function () {
            return currentRole;
        }

        var assignCurrentRole = function (role) {
            currentRole = role;
        }




        return {
            assignCurrentRole: assignCurrentRole,
            getCurrentRole: getCurrentRole
        }
    }



    angular.module('AMApp').factory('roleService', roleService);
    roleService.$inject = ['$http', '$q', 'baseUrl', '$rootScope', 'roleFactory'];
})();