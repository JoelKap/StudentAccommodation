(function () {
    'use strict';

    function applicationUserRole($filter) {

        this.applications = [
         {
             applicationId: '01',
             name: 'Global Payment Online',
             acronym: 'GPO',
             claims: [],
             roles: [],
         },
         {
             applicationId: '02',
             name: 'Evolution',
             acronym: 'EVO',
             claims: [],
             roles: [{
                 roleId: '01',
                 roleName: 'Administrator',
                 isAssigned: true
             },

                        {
                            roleId: '02',
                            roleName: 'Spot Creator',
                            isAssigned: true
                        },

                        {
                            roleId: '03',
                            roleName: 'Forward Creator',
                            isAssigned: true
                        },

                        {
                            roleId: '04',
                            roleName: 'Beneficiary Approver',
                            isAssigned: false
                        },

                        {
                            roleId: '05',
                            roleName: 'Payment Capture',
                            isAssigned: true
                        },

                        {
                            roleId: '06',
                            roleName: 'Payment Capture Approver',
                            isAssigned: false
                        },

                        {
                            roleId: '07',
                            roleName: 'Exchange Control Administrator',
                            isAssigned: false
                        },

                        {
                            roleId: '08',
                            roleName: 'Spot Approver',
                            isAssigned: false
                        },

                        {
                            roleId: '09',
                            roleName: 'Transaction History Viewer',
                            isAssigned: true
                        },

                        {
                            roleId: '10',
                            roleName: 'Dealer',
                            isAssigned: false
                        },

                        {
                            roleId: '11',
                            roleName: 'Corporate Payment Administrator',
                            isAssigned: true
                        },
             ],
         }]


        this.getApplications = function () {
            return this.applications;
        }

    }

    angular.module('AMApp').service('applicationUserRole', applicationUserRole);
    applicationUserRole.$inject = ['$filter'];
})();