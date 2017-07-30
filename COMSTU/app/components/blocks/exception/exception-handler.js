(function () {
    'use strict';

    var extendExceptionHandler = function ($delegate, $injector) {
        return function (exception, cause)
        {
        $delegate(exception, cause);
        var errorData = { exception: exception, cause: cause };
        var msg = exception.message;
        var logger = $injector.get('logger');
        /**
         * Could add the error to a service's collection,
         * add errors to $rootScope, log errors to remote web server,
         * or log locally. Or throw hard. It is entirely up to you.
         * throw exception;
         */
        //toastr.error(exception.msg, errorData);

        logger.error(msg, errorData);
    };
};

var exceptionConfig = function ($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);};

extendExceptionHandler.$inject = ['$delegate', '$injector'];

angular.module('blocks.exception').config(exceptionConfig);
exceptionConfig.$inject = ['$provide'];

}());