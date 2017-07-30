(function () {
    'use strict';
    function alertDialogService($http, $q, baseUrl, $rootScope) {
        var self = this;
        self.path = [];
       

        this.getPath = function()
        {
            return this.path;
        }

        this.setPath = function(path)
        {
            this.path = path;
        }

    }

    angular.module('AMApp').service('alertDialogService', alertDialogService);
    alertDialogService.$inject = ['$http', '$q', 'baseUrl', '$rootScope'];
})();