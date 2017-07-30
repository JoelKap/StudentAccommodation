(function() {
    'use strict';
    function pageNotFoundController($location, $scope, $window) {
        var vm = this;
        init()
        function init() {
            console.log("Error Code: 404");
        }
        vm.back = function () {
            if($window.history.length == "1"){
                $location.path('/viewUsers');
            }
            else{
                $window.history.back();
            }
        }
    }
    angular.module('AMApp').controller('pageNotFoundController', pageNotFoundController);
    pageNotFoundController.$inject = ['$location', '$scope', '$window'];
})();