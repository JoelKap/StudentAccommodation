(function () {
    'use strict';

    function applicationDataModel($filter, helper) {

        this.applications = [
         {
             applicatinId: '2',
             name: 'GPO',
             accronym: 'G.P.O',

             claims: [
                 { claimId: 1, allowMultiples: false, claimName: "customer", value: { customer: { id: 1, customerName: 'British Trading', customerNumber: '75472753436' }, paymentApprovalLimit: 1500, quoteRequestLimit: 10000 } },
                 { claimId: 1, allowMultiples: false, claimName: "customer", value: { customer: { id: 1, customerName: 'Toys R Us Pty. Ltd.', customerNumber: '27683547239' }, paymentApprovalLimit: 3000, quoteRequestLimit: 20000 } }],
             roles: [
                 {
                     roleId: '1',
                     roleName: 'First Role',
                     isAssigned: false,
                 },
                                 {
                                     roleId: '2',
                                     roleName: 'Admin Role',
                                     isAssigned: true,
                                 },
             ]
         },
         {
             applicatinId: '2',
             name: 'GPO2',
             accronym: 'G.P.O.2',

             claims: [{ claimId: 1, allowMultiples: false, claimName: "company", value: { customer: { id: 1, customerName: 'British Trading', customerNumber: '75472753436' }, paymentApprovalLimit: 1500, quoteRequestLimit: 10000 } }],
             roles: [
                 {
                     roleId: '2',
                     roleName: 'User Role',
                     isAssigned: false
                 },
                                 {
                                     roleId: '3',
                                     roleName: 'Data Capturer Role',
                                     isAssigned: true
                                 },
             ]
         },
         {
             applicatinId: '3',
             name: 'GPO3',
             accronym: 'G.P.O.3',

             claims: [{ claimId: 1, claimName: "company", customer: { id: 1, customerName: 'British Trading', customerNumber: '75472753436' }, paymentApprovalLimit: 1500, quoteRequestLimit: 10000 }],
             roles: [
                 {
                     roleId: '2',
                     roleName: 'User Role',
                     isAssigned: false
                 },
                                 {
                                     roleId: '3',
                                     roleName: 'Data Capturer Role',
                                     isAssigned: true
                                 },
             ]
         },
         {
             applicatinId: '4',
             name: 'GPO4',
             accronym: 'G.P.O.4',

             claims: [{ claimId: 1, claimName: "company", customer: { id: 1, customerName: 'British Trading', customerNumber: '75472753436' }, paymentApprovalLimit: 1500, quoteRequestLimit: 10000 }],
             roles: [
                 {
                     roleId: '2',
                     roleName: 'User Role',
                     isAssigned: false
                 },
                                 {
                                     roleId: '3',
                                     roleName: 'Data Capturer Role',
                                     isAssigned: true
                                 },
             ]
         },
         {
             applicatinId: '5',
             name: 'GPO5',
             accronym: 'G.P.O.5',

             claims: [{ claimId: 1, claimName: "company", customer: { id: 1, customerName: 'British Trading', customerNumber: '75472753436' }, paymentApprovalLimit: 1500, quoteRequestLimit: 10000 }],
             roles: [
                 {
                     roleId: '2',
                     roleName: 'User Role',
                     isAssigned: false
                 },
                                 {
                                     roleId: '3',
                                     roleName: 'Data Capturer Role',
                                     isAssigned: true
                                 },
             ]
         },
         {
             applicatinId: '6',
             name: 'GPO6',
             accronym: 'G.P.O.6',

             claims: [{ claimId: 1, claimName: "company", customer: { id: 1, customerName: 'British Trading', customerNumber: '75472753436' }, paymentApprovalLimit: 1500, quoteRequestLimit: 10000 }],
             roles: [
                 {
                     roleId: '2',
                     roleName: 'User Role',
                     isAssigned: false
                 },
                                 {
                                     roleId: '3',
                                     roleName: 'Data Capturer Role',
                                     isAssigned: true
                                 },
             ]
         }
        ]
        var applicationUserRole = {};

        this.getApplications = function () {
            return this.applications;
        }

        this.saveApplicationRoles = function (data) {
            return this.applicationUserRole = data;
        }

        this.addApplication = function (newApplication) {

            if (newApplication.applicatinId == undefined || newApplication.applicatinId == '') {
                newApplication.applicatinId = helper.getRandomizeId();
            }

            for (var i = 0; i < this.applications.length; i++) {
                if (this.applications[i].accronym == newApplication.accronym) {
                    return false;
                }


            }


            this.applications.push(newApplication);
            return true;
        }

        this.editApplication = function (application) {

            for (var i = 0; i < this.applications.length; i++) {
                if (this.applications[i].applicatinId == application.applicatinId) {
                    this.applications[i] = application;
                    return true;
                }
            }

            return false;
        }

        this.getApplicationById = function (applicationId) {

            for (var i = 0; i < this.applications.length; i++) {
                if (this.applications[i].applicatinId == applicationId) {

                    return this.applications[i];
                }
            }

            return false;
        }



    }

    angular.module('AMApp').service('applicationDataModel', applicationDataModel);
    applicationDataModel.$inject = ['$filter', 'helper'];
})();