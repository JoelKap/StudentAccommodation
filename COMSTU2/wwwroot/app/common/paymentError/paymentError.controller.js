(function () {
    'use strict';



    function paymentErrorController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'paymentError';

        init();

        function init() {
            alert('payment was not successfull');
        }
    }

    angular.module('COMSTU').controller('paymentErrorController', paymentErrorController);
    paymentErrorController.$inject = ['$location'];
})();
