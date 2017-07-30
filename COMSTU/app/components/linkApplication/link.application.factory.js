(function () {
    'use strict';

    function linkApplicationFactory($http, $q, baseUrl, $httpBackend, evoUrl, $sessionStorage) {

      var evoUrl2 = 'https://jhbh-dev-merii.bidvestbank.local:8082/EvoWebApiSprint/api/individualCustomer';
         //var evoUrl = 'https://localhost/EVOWebApi/api/individualCustomer';
        var getApplications = function () {
            var defered = $q.defer();

            var returnCompleteData = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Application/GetApplications').then(returnCompleteData, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        var getIndividualCustomers = function (criteria) {

            var defered = $q.defer();
            var getCustomersComplete = function (value) {
                defered.resolve(value.data.Response.$values);
            }


            $http.get(evoUrl + 'individualCustomer/Get?uniqueNumber=' + criteria, {headers: {'Authorization' : 'Bearer ' + $sessionStorage.token}})
                .then(getCustomersComplete, function (err, status) {
                defered.reject(err);
            });
            return defered.promise;

        }

        var getSelectedCustomerInfo = function (criteria) {

            var defered = $q.defer();
            var getSelectedCustomerInfoComplete = function (value) {
                var individualObject = {
                    FirstName: '',
                    IndividualCustomerId: ''
                };
                individualObject.FirstName = value.data.FirstName;
                individualObject.IndividualCustomerId = value.data.IndividualCustomerId;

                defered.resolve(JSON.stringify(individualObject));
            }


            $http.get(evoUrl + 'individualCustomer' + '/GetIndividualCustomer' + "?id=" + criteria.CustomerId + '&mode=' + 'Maintain' + '&role=' + 'CorporateAdmin', { headers: { 'Authorization': 'Bearer ' + $sessionStorage.token } })
            .then(getSelectedCustomerInfoComplete, function (err, status) {
                defered.reject(err);
            });
            return defered.promise;
        }


        var getCustomers = function() {
            var defered = $q.defer();
            var returnCompleteData = function(response) {
                defered.resolve(response.data);
            }
            $http.get(baseUrl + '/Customers/GetCustomers').then(returnCompleteData, function(err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        $httpBackend.whenGET(baseUrl + '/Application/GetApplications').passThrough();
        $httpBackend.whenGET(baseUrl + '/Customers/GetCustomers').passThrough();

        return { 
            getApplications: getApplications,
            getCustomers: getCustomers,
            getIndividualCustomers: getIndividualCustomers,
            getSelectedCustomerInfo: getSelectedCustomerInfo
        }


        
    }
    angular.module('AMApp').factory('linkApplicationFactory', linkApplicationFactory);
    linkApplicationFactory.$inject = ['$http', '$q', 'baseUrl', '$httpBackend', 'evoUrl', '$sessionStorage'];
})();