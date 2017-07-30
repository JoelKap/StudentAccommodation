(function () {
    'use strict';



    function claimFactory($http, $q, baseUrl, $rootScope) {

        var addClaim = function (claim) {
            var defered = $q.defer();
            var addClaimDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/addClaim', claim)
            .then(addClaimDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }


        var editClaim = function (claim) {
            var defered = $q.defer();
            var editClaimDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/editClaim', claim)
            .then(editClaimDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }


        var deleteClaim = function (claim) {
            var defered = $q.defer();
            var deleteClaimDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/deleteClaim', claim)
            .then(deleteClaimDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getClaims = function (applicationId) {
            var defered = $q.defer();

            var getClaimsDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/getClaims', applicationId).then(getClaimsDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
        return {
            addClaim: addClaim,
            editClaim: editClaim,
            deleteClaim: deleteClaim,
            getClaims: getClaims,

        }
    }



    angular.module('AMApp').factory('claimFactory', claimFactory);
    claimFactory.$inject = ['$http', '$q', 'baseUrl', '$rootScope'];
})();