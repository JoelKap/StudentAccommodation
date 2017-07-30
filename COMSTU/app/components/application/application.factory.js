(function () {
    'use strict';



    function ApplicationFactory($http, $q, baseUrl, $rootScope) {
        $http.defaults.headers.common['Cache-Control'] = 'no-cache';
        $http.defaults.headers.common['Pragma'] = 'no-cache';

        var getApplications = function () {
            var defered = $q.defer();

            var getApplicationsDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Application/GetApplications').then(getApplicationsDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }




        var addApplication = function (application) {
            var defered = $q.defer();
            var addApplicationDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/Application/CreateApplication', application)
            .then(addApplicationDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }


        var editApplication = function (application) {
            var defered = $q.defer();
            var editApplicationDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/Application/EditApplication', application)
            .then(editApplicationDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }
         
        var getApplicationId = function (applicationId) {
        
            var defered = $q.defer();
            var getApplicationDataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Application/GetApplicationById/?applicationId=' + applicationId)
            .then(getApplicationDataComplete, function (err, status) {
                defered.reject(err);
            });
            return defered.promise;
        }


        //var getApplications = function () {
        //    var defered = $q.defer();

        //    var getApplicationsDataComplete = function (response) {
        //        defered.resolve(response.data);
        //    }

        //    $http.get(baseUrl + '/Application/GetApplications').then(getApplicationsDataComplete, function (err, status) {
        //        defered.reject(err);
        //    });

        //    return defered.promise;
        //}
        return {
            getApplications: getApplications,
            addApplication: addApplication,
            editApplication: editApplication,
            getApplicationId: getApplicationId

        }
    }
    angular.module('AMApp').factory('ApplicationFactory', ApplicationFactory);
    ApplicationFactory.$inject = ['$http', '$q', 'baseUrl', '$rootScope'];
})();