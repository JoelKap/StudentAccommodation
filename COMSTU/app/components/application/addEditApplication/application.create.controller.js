(function () {
    'use strict';

    function applicationCreateController($location, ApplicationFactory, applicationService, roleFactory, claimFactory, roleService, claimService, UserFactory, helper, modal, $scope, $rootScope, $mdToast, alertDialogService) {
        /* jshint validthis:true */

        var vm = this;
        var applications = [{}];
        var users = [];
        vm.heading = "Application Management";
        vm.icon = "assignment";
        vm.accronymIsUnique = true;
        vm.accronymIsUpperCase = true;
        vm.isApplicationEdit = false;
        vm.application = {};
        vm.formSubmitted = false;
        vm.rolesError = false;
        vm.claimsError = false;

        init();

        function init() {


            ApplicationFactory.getApplications().then(function (response) {
                if (response) {
                    applications = response;
                }
            }, function (error) { });

            vm.application = applicationService.getCurrentApplication();
            if (vm.application.Accronym == undefined || vm.application.Accronym == '') {
                vm.isApplicationEdit = false;
            }

            else {
                vm.isApplicationEdit = true;
                UserFactory.getUsers().then(function (response) {
                    if (response) {
                        users = response;
                    }
                }, function (error) { });
            }
        }

        vm.closeModal = function () {
            modal.hide();
        }

        vm.add = function (application) {
            //applicationService.assignCurrentApplication({ applicationId: '', name: '', accronym: '', claims: [], roles: [] });
            //vm.application = applicationService.getCurrentApplication();
            vm.formSubmitted = true;

            if ((application.Name == '' || application.Name == undefined) || (application.Accronym == '' || application.Accronym == undefined)) {
                vm.rolesError = true;
                vm.claimsError = true;
                return vm.rolesError, vm.rolesError;
            }

            if ((application.Claims == undefined || application.Claims.length < 1) || (application.Roles == undefined || application.Roles.length < 1)) {

                vm.rolesError = true;
                vm.claimsError = true;
                return vm.rolesError, vm.rolesError;

            }

            if (vm.accronymIsUpperCase == true && vm.accronymIsUnique == true) {
                ApplicationFactory.addApplication(application).then(function (response) {
                    if (response) {
                        $mdToast.show(
                                    $mdToast.simple()
                                   .textContent('Application successfully saved')
                                   .hideDelay(3000)
                                    );
                        applicationService.assignCurrentApplication({ ApplicationId: '', Name: '', Accronym: '', Claims: [], Roles: [] });
                        $location.path('/viewApplications');
                    }
                }, function (error) { });
                //applicationService.assignCurrentApplication(application);

            }

            else {
                $mdToast.show(
                                    $mdToast.simple()
                                   .textContent('Make sure all the fields are valid')
                                   .hideDelay(3000)
                                    );
            }


        }

        vm.edit = function (application) {
            vm.formSubmitted = true;
            if ((application.Name == '' || application.Name == undefined) || (application.Accronym == '' || application.Accronym == undefined)) {
                vm.rolesError = true;
                vm.claimsError = true;
                return vm.rolesError, vm.rolesError;
            }

            if ((application.Claims == undefined || application.Claims.length < 1) || (application.Roles == undefined || application.Roles.length < 1)) {

                vm.rolesError = true;
                vm.claimsError = true;
                return vm.rolesError, vm.rolesError;

            }

            if (vm.accronymIsUpperCase == true && vm.accronymIsUnique == true) {
                ApplicationFactory.editApplication(application).then(function (response) {
                    if (response) {
                        $mdToast.show(
                                            $mdToast.simple()
                                           .textContent('Application successfully saved')
                                           .hideDelay(3000)
                                            );
                        applicationService.assignCurrentApplication({ ApplicationId: '', Name: '', Accronym: '', Claims: [], Roles: [] });
                        $location.path('/viewApplications');
                    }
                }, function (error) { });

                //applicationService.assignCurrentApplication(application);

            }

            else {
                $mdToast.show(
                                    $mdToast.simple()
                                   .textContent('Make sure all the fields are valid')
                                   .hideDelay(3000)
                                    );
            }

        }

        vm.cancel = function () {
            alertDialogService.setPath('/viewApplications')
            var templateUrl = '/app/components/alert/alertDialog.template.html';
            modal.show(
                templateUrl, 'alertDialogController'
            );
        }


        vm.checkAccronymIsUnique = function (application) {
            if (application.Accronym != undefined || application.Accronym != '') {
                for (var i = 0; i < applications.length; i++) {
                    if (applications[i].Accronym == application.Accronym) {
                        vm.accronymIsUnique = false;
                        return;
                    }
                }
                vm.accronymIsUnique = true;
            }
        }


        vm.checkAccronymIsUpperCase = function (application) {
            if (application.Accronym != undefined || application.Accronym != '') {
                for (var i = 0; i < application.Accronym.length; i++) {
                    if (application.Accronym.charAt(i) == application.Accronym.charAt(i).toLowerCase()) {
                        vm.accronymIsUpperCase = false;
                        return;
                    }

                }
                vm.accronymIsUpperCase = true;
            }


        }




        vm.editClaim = function (claim) {
            var oldClaim = angular.copy(claim);
            claimService.assignCurrentClaim(oldClaim);
            var templateUrl = '/app/components/application/claim/claim.create.html';
            modal.show(templateUrl, 'claimCreateController');
        }

        vm.addClaim = function () {
            claimService.assignCurrentClaim({});
            var templateUrl = '/app/components/application/claim/claim.create.html';
            modal.show(templateUrl, 'claimCreateController');
        }


        vm.editRole = function (role) {
            var oldRole = angular.copy(role);
            roleService.assignCurrentRole(role);
            var templateUrl = '/app/components/application/role/role.create.html';
            modal.show(templateUrl, 'roleCreateController');
        }

        vm.addRole = function () {
            roleService.assignCurrentRole({});
            var templateUrl = '/app/components/application/role/role.create.html';
            modal.show(templateUrl, 'roleCreateController');
        }

        vm.deleteRole = function (index) {

            if (users != undefined) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].applications != undefined && users[i].applications.length > 0) {
                        for (var j = 0; j < users[i].applications.length; j++) {
                            if (users[i].applications[j].Accronym == vm.application.Accronym) {

                                for (var k = 0; k < users[i].applications[j].Roles.length; k++) {
                                    if (users[i].applications[j].Roles != undefined) {
                                        if (users[i].applications[j].Roles[k].roleName == vm.application.Roles[index].roleName) {
                                            $mdToast.show(
                                                            $mdToast.simple()
                                                           .textContent('This role cannot be removed as it has users linked to it.')
                                                           .hideDelay(3000)
                                                            );
                                            return;
                                        }

                                    }
                                }

                            }
                        }
                    }
                }


                var roleToRemove = vm.application.Roles[index];
                if (roleToRemove != undefined) {
                    roleFactory.deleteRole(roleToRemove);
                    $mdToast.show(
                                        $mdToast.simple()
                                       .textContent('Role successfully removed.')
                                       .hideDelay(3000)
                                        );
                }
            }

            else {
                var roleToRemove = vm.application.Roles[index];
                if (roleToRemove != undefined) {
                    roleFactory.deleteRole(roleToRemove);
                    $mdToast.show(
                                        $mdToast.simple()
                                       .textContent('Role successfully removed.')
                                       .hideDelay(3000)
                                        );
                }
            }

        }

        vm.deleteClaim = function (index) {
            if (users != undefined) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].applications != undefined && users[i].applications.length > 0) {
                        for (var j = 0; j < users[i].applications.length; j++) {
                            if (users[i].applications[j].Accronym == vm.application.Accronym) {

                                for (var k = 0; k < users[i].applications[j].Claims.length; k++) {
                                    if (users[i].applications[j].Claims[k] != undefined) {
                                        if (users[i].applications[j].Claims[k].claimName == vm.application.Claims[index].claimName) {
                                            $mdToast.show(
                                                            $mdToast.simple()
                                                           .textContent('This claim cannot be removed as it has users linked to it.')
                                                           .hideDelay(3000)
                                                            );
                                            return;
                                        }

                                    }
                                }
                            }
                        }
                    }
                }






                var claimToRemove = vm.application.Claims[index];
                if (claimToRemove != undefined) {
                    claimFactory.deleteClaim(claimToRemove);
                    $mdToast.show(
                                        $mdToast.simple()
                                       .textContent('Value successfully removed.')
                                       .hideDelay(3000)
                                        );

                }


            }




            else {
                var claimToRemove = vm.application.Claims[index];
                if (claimToRemove != undefined) {
                    claimFactory.deleteClaim(claimToRemove);
                    $mdToast.show(
                                        $mdToast.simple()
                                       .textContent('Value successfully removed.')
                                       .hideDelay(3000)
                                        );

                }

            }

        }
    }

    angular.module('AMApp').controller('applicationCreateController', applicationCreateController);
    applicationCreateController.$inject = ['$location', 'ApplicationFactory', 'applicationService', 'roleFactory', 'claimFactory', 'roleService', 'claimService', 'UserFactory', 'helper', 'modal', '$scope', '$rootScope', '$mdToast', 'alertDialogService'];

})();

