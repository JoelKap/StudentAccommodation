(function () {
    'use strict';

    function roleCreateController($location, applicationService, roleService,roleFactory, helper, modal, $scope, $rootScope, $mdToast) {
        /* jshint validthis:true */

        var vm = this;
        //$scope.title = 'applicationCreateController';
        $scope.pageHeading = 'Create/Edit Role';
        $scope.pageHeadingIcon = "playlist_add_check";

        $scope.role = {};
        $scope.isApplicationEdit = false;
        $scope.application = {};
        $scope.formSubmitted = false;
        $scope.isRoleEdit = false;
        $scope.roleNameIsNotUnique = false;
        
        init();


        function init() {

            $scope.application = applicationService.getCurrentApplication();
            $scope.role = angular.copy(roleService.getCurrentRole());
            //$scope.isRoleEdit = $scope.checkIfEdit($scope.role);
            if ($scope.role.roleName == undefined || $scope.role.roleName == '') {
                $scope.isRoleEdit = false;
            }

            else {
                $scope.isRoleEdit = true;
            }
        }



      
        $scope.checkUniqueness = function (role)
        {
            if (role.roleName != undefined || role.roleName != '') {
                if ($scope.application.Roles != undefined && $scope.application.Roles.length > 0)
                {
                    for (var i = 0; i < $scope.application.Roles.length; i++) {
                        if ($scope.application.Roles[i].roleName == role.roleName) {
                            $scope.roleNameIsNotUnique = true;
                            return;
                        }

                    }
                    $scope.roleNameIsNotUnique = false;
                }
                
            }
        }

        $scope.add = function (role) {
            $scope.formSubmitted = true;
            if (role.roleName == '' || role.roleName == undefined) {
                $mdToast.show(
                                   $mdToast.simple()
                                  .textContent('Enter all required information')
                                  .hideDelay(3000)
                                   );

                return;
            }

            if ($scope.roleNameIsNotUnique == false) {
                roleFactory.addRole(role);
                $mdToast.show(
                                    $mdToast.simple()
                                   .textContent('Role successfully saved')
                                   .hideDelay(3000)
                                    );
                $scope.closeModal();
            }
            

        }



        $scope.edit = function (role) {
            $scope.formSubmitted = true;
            if (role.roleName == '' || role.roleName == undefined) {
                $mdToast.show(
                                   $mdToast.simple()
                                  .textContent('Enter all required information')
                                  .hideDelay(3000)
                                   );

                return;
            }

            if ($scope.roleNameIsNotUnique == false) {
                roleFactory.editRole(role);
                $mdToast.show(
                                    $mdToast.simple()
                                   .textContent('Role successfully saved')
                                   .hideDelay(3000)
                                    );
                $scope.closeModal();
            }
            

        }

        $scope.canceld = function () {
            $scope.closeModal();
        }

        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.ok = function () {
            modal.hide();
        };

        $scope.cancel = function () {
            modal.hide();
        };

    }

    angular.module('AMApp').controller('roleCreateController', roleCreateController);
    roleCreateController.$inject = ['$location', 'applicationService', 'roleService','roleFactory', 'helper', 'modal', '$scope', '$rootScope', '$mdToast'];

})();