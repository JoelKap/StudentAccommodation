(function () {
    'use strict';



    function linkApplicationService($http, $q, baseUrl, linkApplicationFactory) {

        var self = this;
        self.applications = [];
        self.customers = [];
        self.selectedApplication = {};
             

        this.getApplicationData = function () {

            linkApplicationFactory.getApplications().then(function (data) {
                self.applications.length = 0;
                self.applications.push.apply(self.applications, data);
           });

        }

        this.getCustomers = function (data, callback) {
            linkApplicationFactory.getIndividualCustomers(data).then(function (response) {
                callback(response);
                self.customers = response;
            });
        }

        this.getSelectedApplication = function() {
            return self.selectedApplication;
        }

        this.fillCustomersList = function () {
            self.customers = [];
            linkApplicationFactory.getCustomers().then(function(data) {
                self.customers.push.apply(self.customers, data);
            });
        }

        this.getSelectedCustomerInfo = function (data, callback) {
            linkApplicationFactory.getSelectedCustomerInfo(data).then(function (response) {
                callback(response);
                self.selectedCustomer = response;
            });
        }

        this.getUserRolesData = function () {
            var defered = $q.defer();
            var getUserRolesDataComplete = function (response) {
                defered.resolve(response.data);
            }


            $http.put(baseUrl + '/userRoles')
            .then(getUserRolesDataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;

        }

        this.saveApplicationUserRoles = function (data) {
            var defered = $q.defer();
            var getHttpResponseComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.put(baseUrl + '/saveApplicationRoles', data)
            .then(getHttpResponseComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;

        }

        this.assignCurrentClaim = function (claim) {

        }

        this.setSelectedApplication  = function(application) {
            self.selectedApplication = application;
        }

        this.addCustomer = function(customer) {
            self.selectedApplication.Claims.push({
                claimId: 0,
                claimName: "company",
                claimValue: (customer)
        });
        }
    }

    angular.module('AMApp').service('LinkApplicationService', linkApplicationService);
    linkApplicationService.$inject = ['$http', '$q', 'baseUrl', 'linkApplicationFactory'];
})();