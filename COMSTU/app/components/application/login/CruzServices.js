(function () {
    'use strict';



    function CruzServices($http, $q, baseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'CruzServices';
        vm.user = {};
        vm.account = {};
        vm.beneficiary = {};
        vm.beneficiaries = [];
        vm.accounts = [];
        this.createPersonalAccount = function (beneficiaryAccount) {
            var defered = $q.defer();
            var accountComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/Account/createAccount', beneficiaryAccount).then(accountComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.deleteAccount = function(accountId) {
            var defered = $q.defer();

            var deletedAccountComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Account/DeletedUserAccount?id=' + accountId).then(deletedAccountComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.deleteBeneficiary = function(beneficiaryId) {
            var defered = $q.defer();

            var deletedBenenficiaryComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/beneficiary/DeleteUserBeneficiary?id=' + beneficiaryId).then(deletedBenenficiaryComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.createBeneficiary = function (beneficiaryAccount) {
            var defered = $q.defer();
            var beneficiaryComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/beneficiary/createBenefiary', beneficiaryAccount).then(beneficiaryComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getBeneficiaries = function (userId) {
            var defered = $q.defer();
            var beneficiaryComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/beneficiary/GetUserBeneficiaries?id=' + userId).then(beneficiaryComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getpackages = function() {
            var defered = $q.defer();
            var packageComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/beneficiary/GetPackages').then(packageComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.requestionIncome = function (userId, beneficiaryName, amount, accountId) {
            var defered = $q.defer();
            var requesteComplete = function (response) {
                defered.resolve(response.data);
            }   

            $http.get(baseUrl + '/Account/SendAmountRequest?id=' + userId + '&beneficiary=' + beneficiaryName + '&requestedAmount=' + amount + '&accountId=' + accountId)
                .then(requesteComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getUserDetails = function (userId) {
            var defered = $q.defer();

            var getUserDetailsComplete = function (response) {

                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/LogIn/GetUserDetails?userId=' + userId).then(getUserDetailsComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.saveUpdatedUser = function(userInfo) {
            var defered = $q.defer();
            var userComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.post(baseUrl + '/LogIn/UpdateUser', userInfo).then(userComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getTransanctions = function (userId) {
            var defered = $q.defer();
            var transactionComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Transaction/GetUserTransanctions?id=' + userId).then(transactionComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getAccounts = function (userId) {
            var defered = $q.defer();
            var accountComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Account/GetUserAccount?id=' + userId).then(accountComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getDataStatistic = function () {

            var defered = $q.defer();
            var statComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Admin/GetStatistic').then(statComplete, function (err, status) {
                defered.reject(err);
            }); 

            return defered.promise;
        }

        this.getUserByReference = function(item) {
            var defered = $q.defer();
            var dataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Admin/GetUserByReferenceNumber?userReferenceNumber=' + item).then(dataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.saveRetrievedUser = function(item) {
            vm.user = item;
        }

        this.getTransactionUser = function() {
            return vm.user;
        }

        this.downloadDepositSlip = function() {
            var defered = $q.defer();
            var dataComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/LogIn/DowloadDepositSlip').then(dataComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }

        this.getUserAccountToDeduct = function(amount, userId) {
            var defered = $q.defer();
            var requesteComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Account/DeductFromUserAccount?amount=' + amount + '&userId=' + userId)
                .then(requesteComplete, function (err, status) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        this.getUserTransanction = function (amount, userId) {
            var defered = $q.defer();
            var requesteComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Admin/ActivateUserTransaction?amount=' + amount + '&userId=' + userId)
                .then(requesteComplete, function (err, status) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        this.saveAccount = function(account) {
            vm.account = account;
        }

        this.saveAccounts = function (accounts) {
            vm.accounts = accounts;
        }

        this.getAccount = function() {
            return vm.account;
        }

        this.getAccountSaved = function () {
            return vm.accounts;
        }

        this.saveBeneficiary = function(beneficiary) {
            vm.beneficiary = beneficiary;
        }
        this.saveBeneficiaries = function(beneficiaries) {
            vm.beneficiaries = beneficiaries;
        }
        this.getBeneficiary = function() {
            return vm.beneficiary;
        }
        this.getBeneficiariesSaved = function () {
            return vm.beneficiaries;
        }
    }

    angular.module('AMApp').service('CruzServices', CruzServices);
    CruzServices.$inject = ['$http', '$q', 'baseUrl', '$sessionStorage'];
})();