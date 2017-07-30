(function () {
    'use strict';

    function adminActivationController($location, adminServices, toastr) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'adminActivation';
        vm.accommodations = [];
        vm.isClicked = false;

        init();

        function init() {
            adminServices.getAccommodations().then(function (result) {
                if (result.length > 0) {
                    vm.accommodations = result;
                } else {
                    //message not found
                    toastr.info('No Accommodations found to activate');
                    vm.accommodations = [];
                }
            });
        }


        vm.activateAccommodation = function (acc, index) {
            vm.isClicked = true;
            adminServices.activateAcc(acc).then(function (result) {
                if (result) {
                    toastr.success('Activated successfully');
                    vm.isClicked = false;
                    vm.accommodations.splice(index, 1);
                    //setTimeout(function () {
                    //   // init();
                    //}, 4000);
                }
                else {
                    //message not activated
                    toastr.error('Error activating accommodation, Please contact system admin');
                }
            })
        }
    }

    angular.module('COMSTU').controller('adminActivationController', adminActivationController);
    adminActivationController.$inject = ['$location', 'adminServices', 'toastr'];
})();
