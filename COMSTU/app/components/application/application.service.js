(function () {
    'use strict';



    function applicationService($http, $q, baseUrl, $rootScope) {

       


        //var currentApplication = {
        //    applicatinId: '',
        //    name: '',
        //    accronym: '',

        //    claims: [
        //        {
        //            claimId: '',
        //            claimName: '',
        //            flagValue: false,

        //        }
        //    ],
        //    roles: [
        //        {
        //            roleId: '',
        //            roleName: '',
        //            isAssigned: false,
        //        }
        //    ]
        //};
        var currentApplication = { ApplicationId:'',Name:'',Accronym:'',Claims: [], Roles: [] };


        var getCurrentApplication = function () {
            return currentApplication;
        }

        var assignCurrentApplication = function (application) {
            currentApplication = application;
        }

       
        


        return {
            getCurrentApplication: getCurrentApplication, assignCurrentApplication: assignCurrentApplication, currentApplication: currentApplication,  
        }
    }



    angular.module('AMApp').factory('applicationService', applicationService);
    applicationService.$inject = ['$http', '$q', 'baseUrl', '$rootScope'];
})();