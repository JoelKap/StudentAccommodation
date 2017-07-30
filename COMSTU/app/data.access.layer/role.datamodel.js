(function () {
    'use strict';

    function roleDataModel($filter, helper,applicationService) {

        this.role = 
         {
             
             roleId: '',
             roleName: '',
             isAssigned: false
         }
        
        var currentApplication={}; 
     

        this.addRole = function (role) {
            this.currentApplication = applicationService.getCurrentApplication();

            if (role.roleId == undefined || role.roleId == '') {
                role.roleId = helper.getRandomizeId();
            }


            this.currentApplication.Roles.push(role);
            return true;
        }

        this.editRole = function (role) {
            this.currentApplication = applicationService.getCurrentApplication();

            for (var i = 0; i < this.currentApplication.Roles.length; i++) {
                if (this.currentApplication.Roles[i].roleId == role.roleId) {
                    this.currentApplication.Roles[i] = role;
                    return true;
                }
            }

            return false;
        }

        this.deleteRole = function (role) {
            this.currentApplication = applicationService.getCurrentApplication();

            for (var i = 0; i < this.currentApplication.Roles.length; i++) {
                if (this.currentApplication.Roles[i].roleId == role.roleId) {
                    this.currentApplication.Roles.splice(i,1);
                    return true;
                }
            }

            return false;
        }

        this.getRolesByApplicationId = function (applicationId) {
            if (applicationId != undefined && applicationId != '') {
                var application = ApplicationFactory.getApplicationId(applicationId);
            }

            if (application != undefined) {
                return application.Roles;
            }

            else {
                return false;
            }
        }



    }

    angular.module('AMApp').service('roleDataModel', roleDataModel);
    roleDataModel.$inject = ['$filter', 'helper', 'applicationService'];
})();