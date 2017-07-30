(function () {
    'use strict';

    function userAddEditController($location, UserService, UserFactory, helper, modal, alertDialogService, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "User Management";
        vm.icon = "person";
        vm.formSubmitted = false;
        vm.user = { lockedOut: false, applications: [] };
        vm.model = {
                    isUserEdit: false,
                    usernameExixt: false,
        }
        vm.test = false;


        init();
        function init() {
            vm.user = UserService.userDetails;
            if (vm.user) {
                vm.model.isUserEdit = true;
            }
            else
            {
                vm.user = { lockedOut: false, applications: [] };
            }
        };        

        vm.addUser = function (user) {
            vm.formSubmitted = true;
            if (vm.userForm.$valid) {
                UserService.addUser(user);
                UserService.assignSelectedUser(undefined);
            }
            return vm.formSubmitted;
        }

        vm.editUser = function (user) {
            if (vm.userForm.$valid) {                
                UserService.editUser(user);
                UserService.assignSelectedUser(user);
        }
        }

        vm.linkApplication = function (user) {
            if (vm.userForm.$valid) {
                UserService.assignSelectedAppIndex(undefined)
                UserService.assignSelectedUser(user);
                $location.path('/AssignLinkApplicationRole');
            }
        };

        vm.editApplication = function (user, appIndex) {
            if (vm.userForm.$valid) {
                UserService.assignSelectedAppIndex(appIndex)
                UserService.assignSelectedUser(user);
                $location.path('/AssignLinkApplicationRole');
            }     
        }        

        vm.resetPassword = function (user) {
            if (confirm("Are you sure you want to reset this user's password?"))
            {
                var password = helper.generatePassword();
                UserService.resetUserPassword(user.userId, password);
                    }
        }

        vm.sendUserDetails = function (user)
        {
            UserService.sendUserDetails(user.userId);
        }

        vm.checkUniqueUsername = function (username) {
           
            UserService.checkUniqueUsername(username, function (data) {
                vm.model.usernameExixt = data;
            });           
        };

        vm.cancel = function () {
            alertDialogService.setPath('/viewUsers')
            var templateUrl = '/app/components/alert/alertDialog.template.html';
            modal.show(templateUrl, 'alertDialogController');
        }
    }

    angular.module('AMApp').controller('userAddEditController', userAddEditController);
    userAddEditController.$inject = ['$location', 'UserService', 'UserFactory', 'helper', 'modal', 'alertDialogService', '$scope'];
})();
