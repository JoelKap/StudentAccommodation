(function () {
    'use strict';



    function customerSearchController($location, helper, modal, $scope, linkApplicationService) {
        /* jshint validthis:true */
        var vm = this;
        $scope.title = 'Individual Search';
        $scope.customersTotal = 0;
        $scope.selectedCustomer = {};
        $scope.customers = [];
        $scope.hasValues = false;
        vm.searchTags = [];
        $scope.searchDialogue = "Search Results";
        $scope.searchHasError = false;
        $scope.tradingName = "";
        $scope.registrationNumber = "";

        var cust = "";
        $scope.pagenation = {
            limit: 5,
            page: 1,
            pageSelector: true,
            boundaryLinks: true
        };

        var scope;

        init();

        function init() {
        }


        $scope.selectCustomer = function (customer) {

            linkApplicationService.getSelectedCustomerInfo(customer, function (data) {
                $scope.selectedCustomer = data;
                modal.getResult(data);
            });
        }


        $scope.searchOnKeyEvent = function (keyEvent) {
            if (keyEvent.which === 13) {
                $scope.SearchCustomer();

            }
        }




        $scope.SearchCustomer = function (item) {

            //var item = {
            //    TradingName: tradingName !== undefined ? tradingName : vm.tradingName,
            //    RegistrationNumber: registratonNumber !== undefined ? registratonNumber : vm.registrationNumber
            //}


            if (item) {
                linkApplicationService.getCustomers(item, function (data) {
                    $scope.customers = data;

                    if ($scope.customers.length < 1) {
                        $scope.searchDialogue = "No Results Found";
                        $scope.searchHasError = true;
                    } else {
                        $scope.hasValues = true;
                        $scope.searchHasError = false;
                    }
                });
            }
        }

        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.ok = function () {
            modal.hide();
        };

        $scope.cancel = function () {
            modal.hide();
        };
        $scope.selectChategory = function (category) {
            modal.getResult(category);
        };
    }

    angular.module('AMApp').controller('customerSearchController', customerSearchController);
    customerSearchController.$inject = ['$location', 'helper', 'modal', '$scope', 'LinkApplicationService'];
})();
