(function() {
    'use strict';
    function alertDialogController($location, $scope, modal, alertDialogService) {

        var vm = this;
        $scope.navigate = function () {
            $location.path(alertDialogService.getPath());
            modal.hide();
        };

        $scope.cancel = function () {
            modal.hide();
        };
    }

    angular.module('AMApp').controller('alertDialogController', alertDialogController);
    alertDialogController.$inject = ['$location', '$scope', 'modal', 'alertDialogService'];

})();