(function () {
    'use strict';

    function claimDataModel($filter, helper, applicationService, ApplicationFactory) {

        this.claim =
         {

             claimId: '',
             claimName: '',
             allowMultiples: false
         }

        var currentApplication = {};



        this.addClaim = function (claim) {
            this.currentApplication = applicationService.getCurrentApplication();

            if (claim.claimId == undefined || claim.claimId == '') {
                claim.claimId = helper.getRandomizeId();
            }


            this.currentApplication.Claims.push(claim);
            applicationService.assignCurrentApplication(this.currentApplication);
            return true;
        }

        this.editClaim = function (claim) {
            this.currentApplication = applicationService.getCurrentApplication();

            for (var i = 0; i < this.currentApplication.Claims.length; i++) {
                if (this.currentApplication.Claims[i].id == claim.id) {
                    this.currentApplication.Claims[i] = claim;
                    applicationService.assignCurrentApplication(this.currentApplication);
                    return true;
                }
            }

            return false;
        }

        this.deleteClaim = function (claim) {
            this.currentApplication = applicationService.getCurrentApplication();

            for (var i = 0; i < this.currentApplication.Claims.length; i++) {
                if (this.currentApplication.Claims[i].id == claim.id) {
                    this.currentApplication.Claims.splice(i, 1);
                    applicationService.assignCurrentApplication(this.currentApplication);
                    return true;
                }
            }

            return false;
        }
        this.getClaimsByApplicationId=function (applicationId)
        {
            if (applicationId != undefined && applicationId != '')
            {
                var application = ApplicationFactory.getApplicationId(applicationId);
            }
            
            if (application!=undefined)
            {
                return application.Claims;
            }
            
            else {
                return false;
            }
        }


    }

    angular.module('AMApp').service('claimDataModel', claimDataModel);
    claimDataModel.$inject = ['$filter', 'helper', 'applicationService', 'ApplicationFactory'];
})();