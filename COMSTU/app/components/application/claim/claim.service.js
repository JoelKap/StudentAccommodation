(function () {
    'use strict';



    function claimService($http, $q, baseUrl, $rootScope) {


        var currentClaim = {};

      
        var getCurrentClaim = function () {
            return currentClaim;
        }

        var assignCurrentClaim = function (claim) {
            currentClaim = claim;
        }

        




        return {
            assignCurrentClaim: assignCurrentClaim, getCurrentClaim: getCurrentClaim,
        }
    }



    angular.module('AMApp').factory('claimService', claimService);
    claimService.$inject = ['$http', '$q', 'baseUrl', '$rootScope'];
})();