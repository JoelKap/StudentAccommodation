(function () {
    'use strict';



    function paymentSuccesfulController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'paymentSuccesful';

        init();

        function init() {
            alert('Payment was successfull');
        }
    }

    angular.module('COMSTU').controller('paymentSuccesfulController', paymentSuccesfulController);
    paymentSuccesfulController.$inject = ['$location'];
})();
