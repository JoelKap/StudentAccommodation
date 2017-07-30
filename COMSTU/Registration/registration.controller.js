(function () {
    'use strict';



    function registrationController($location, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'registration';

        init();

        function init() {
            alert('WAOOOU!!');
        }

        $scope.registerUser = function (user) {
            //Register User


        }
    }

    angular.module('AMApp').controller('registrationController', registrationController);
    registrationController.$inject = ['$location', '$scope'];
})();
