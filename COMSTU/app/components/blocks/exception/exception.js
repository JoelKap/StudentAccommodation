(function () {
    'use strict';

    var exception = function (logger) {

        var catcher = function (message) {
            return function (reason) {
                logger.error(message, reason);
            };
        },
            service = {
                catcher: catcher
            };
        return service;
    };

    angular.module('blocks.exception', []);
    angular.module('blocks.exception').factory('exception', exception);
    exception.$inject = ['logger'];

}());