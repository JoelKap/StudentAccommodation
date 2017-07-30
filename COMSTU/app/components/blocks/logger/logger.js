(function () {
    'use strict';

    var logger = function ($log, modalService, toastr) {

        var formatTitle = function (title) {
            if (title === undefined) {
                return '';
            }
            return title + ': ';
        }

        var extractErrorInfo = function (errorData) {
            var ret = {
                ErrorCode: "",
                ErrorCodeText: "",
                ErrorMessage: "",
                ExceptionType: "",
                StackTrace: ""
            };

            if (errorData) {
                if (errorData.status) {
                    ret.ErrorCode = errorData.status;
                }
                if (errorData.statusText) {
                    ret.ErrorCodeText = errorData.statusText;
                }
                if (errorData.data) {
                    if (errorData.data.Message) {
                        ret.ErrorMessage = errorData.data.Message;
                    }
                    if (errorData.data.ExceptionMessage) {
                        ret.ErrorMessage = errorData.data.ExceptionMessage;
                    }
                    if (errorData.data.ExceptionType) {
                        ret.ExceptionType = errorData.data.ExceptionType;
                    }
                    if (errorData.data.StackTrace) {
                        ret.StackTrace = errorData.data.StackTrace;
                    }
                }
            }
            return ret;
        };

        var error = function (message, data, title) {
            //toastr.error(message, title);
            var modalOptions = {
                closeButtonText: 'Ok',
                headerText: 'Unexpected Error',
                bodyText: message,
                extractedError: extractErrorInfo(data)
            };

            if (title) {
                modalOptions.headerText = title;
            }

            //modalService.showModal({}, modalOptions).then(function (result) { alert('Hallo'); });
            modalService.showModal({}, modalOptions);

            $log.error('Error: ' + formatTitle(title) + message, data);
            //alert(message + '\n\n See console for more info.');
        };

        var info = function (message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + formatTitle(title) + message, data);
            //alert(message);
        };

        var success = function (message, data, title) {
            toastr.success(message, title);
            $log.info('Success: ' + formatTitle(title) + message, data);
           // alert(message);
        };

        var warning = function (message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + formatTitle(title) + message, data);
            //alert(message);
        };

        return {
            showToasts: true,
            error: error,
            info: info,
            success: success,
            warning: warning,
            // straight to console; bypass toastr
            log: $log.log
        };

    };

    angular.module('blocks.logger', []);

    angular.module('blocks.logger').factory('logger', logger);
    logger.$inject = ['$log', 'modalService', 'toastr'];

}());