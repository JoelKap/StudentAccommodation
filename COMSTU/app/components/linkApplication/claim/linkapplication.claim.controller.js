(function() {
    'use strict';

    function LinkApplicationClaimController($location, $scope, modal, linkApplicationService) {

        var vm = this;

        function init() {
            linkApplicationService.fillCustomersList();
            $scope.customers = linkApplicationService.customers;
        }

        init();

        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.pagenation = {
            order: 'code',
            limit: 5,
            page: 1
        };

        $scope.ok = function () {
            modal.hide();
        };

        $scope.cancel = function () {
            modal.hide();
        };

        $scope.searchTags = [];

        $scope.search = function (item) {
            //linkApplicationService.searchCustomers(item).then(function (data) {
            //    vm.customers = data;
            //});
        }

        $scope.remove = function (item) {

            var str = "";
            item = str;
            $scope.search(str);
        }

        $scope.selectCustomer = function(customer) {
            linkApplicationService.addCustomer(customer);
            modal.hide();
        }

        
    }

    angular.module('AMApp').controller('LinkApplicationClaimController', LinkApplicationClaimController);
    LinkApplicationClaimController.$inject = ['$location', '$scope', 'modal', 'LinkApplicationService'];

})();