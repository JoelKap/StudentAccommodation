(function () {
    'use strict';



    function adminAccountManagementController($location, adminServices, toastr, $window, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'adminAccountManagement';
        vm.accommodations = [];
        vm.users = [];
        vm.isClicked = false;
        vm.shouldPayUser = false;
        init();

        function init() {

            if (!$sessionStorage.logonUser) {
                $location.path('/home');
            }
            else {
                vm.user = $sessionStorage.logonUser;
            }

            adminServices.getUsersToPay().then(function (results) {
                if (results.length > 0) {
                    results.forEach(function (item) {
                        if (item.shouldBePaid == 'No') {
                            vm.shouldPayUser = true;
                        }
                    })
                    vm.users = results;
                } else {
                    toastr.info('No Users found to pay');
                }
            })
        }



        vm.payUser = function (user) {
            adminServices.payUser(user).then(function (result) {
                if (result) {
                    toastr.success('User paid successfully, Please proceed with online payment');
                    init();
                } else {
                    toastr.error('Error activating accommodation, Please contact system admin');
                }
            })
        }
    }

    angular.module('COMSTU').controller('adminAccountManagementController', adminAccountManagementController);
    adminAccountManagementController.$inject = ['$location', 'adminServices', 'toastr', '$window', '$sessionStorage'];
})();
