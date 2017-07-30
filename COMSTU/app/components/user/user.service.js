(function () {
    'use strict';

    function UserService($http, UserFactory, $mdToast, $location) {

        var self = this;
        self.users = [];
        self.userDetails = undefined;
        self.userUpdateDetails = {};
        self.selectedAppIndex = undefined;

        self.getCurrentUser = function () {
            if (self.userDetails != undefined || self.userDetails != null) {
                self.userDetails.activty = {
                    lastLoginDate: '2015-12-10',
                    lastActive: '2012-12-10',
                    LastPasswordChangedDate: '2015-02-15',
                    lastLockoutDate: '2016-01-10',
                    lastUpdatedDate: '2012-01-11'
                };
            }

            self.userDetails;
        }

        self.assignSelectedUser = function (user) {
            self.userDetails = user;
        }

        self.checkUniqueUsername = function (username, callback) {
            UserFactory.checkUniqueUsername(username).then(function (response) {
                callback(response);               
            }, function (error) { });
        }
       


        self.getUsers = function (callback) {
            self.users = [];
            UserFactory.getUsers().then(function (response) {
                if (response) {
                    callback(response);
                    self.users.push.apply(self.users, response);
                }
            }, function (error) { });
        }
        self.saveUpdatedUserApplicationRole = function (updatedUserRoleApplication) {
            UserFactory.editUser(updatedUserRoleApplication).then(function (data) {
                if (data) {
                    $mdToast.show(
                $mdToast.simple()
                .textContent('User was saved successfully!')
                .hideDelay(3000)
             );
                    $location.path('/viewUsers');
                }

            });
        };

        self.linkUserToTheUpdateApplication = function (selectedApplication, user) {
            if (self.selectedAppIndex != undefined) {


                for (var j = 0; j < user.applications.length; j++) {
                    var application = user.applications[j];
                    if (application.ApplicationId === selectedApplication.ApplicationId) {
                        user.applications[j] = selectedApplication;
                        self.saveUpdatedUserApplicationRole(user);
                    }
                }

            } else {
                user.applications.push(selectedApplication);
                self.saveUpdatedUserApplicationRole(user);
            }
        };

        self.saveUpdatedUserApplicationRole = function (updatedUserRoleApplication) {
            UserFactory.editUser(updatedUserRoleApplication).then(function (data) {
                if (data) {
                    $mdToast.show(
                $mdToast.simple()
                .textContent('User was saved successfully!')
                .hideDelay(3000)
             );
                    $location.path('/viewUsers');
                }

            });
        };


        self.getSelectedAppIndex = function () {
            return self.selectedAppIndex;
        }

        self.assignSelectedAppIndex = function (index) {
            self.selectedAppIndex = index;
        }

        self.addUser = function (user) {
            UserFactory.addUser(user).then(function (response) {
                if (response) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('User was saved successfully!')
                        .hideDelay(3000)
                     );
                    $location.path('/viewUsers');
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('User was not saved successfully!')
                        .hideDelay(3000)
                    );
                }
            }, function (error) { });
        }

        self.editUser = function (user) {
            UserFactory.editUser(user).then(function (response) {
                if (response) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('User was saved successfully!')
                        .hideDelay(3000)
                     );
                    $location.path('/viewUsers');
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('User was not saved successfully!')
                        .hideDelay(3000)
                    );
                }
            }, function (error) { });
        }

        self.resetUserPassword = function (userId, password) {

            UserFactory.resetUserPassword(userId, password).then(function (response) {
                if (response) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Password was reset successfully!')
                        .hideDelay(3000)
                     );
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Password was not not reset successfully!')
                        .hideDelay(3000)
                    );
                }
            }, function (error) { });
        }


        self.sendUserDetails = function (userId) {

            UserFactory.sendUserDetails(userId).then(function (response) {
                if (response) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('User Details was sent successfully!')
                        .hideDelay(3000)
                     );
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('User Details was not sent successfully!')
                        .hideDelay(3000)
                    );
                }
            }, function (error) { });
        }


        return self;
    }

    angular.module('AMApp').service('UserService', UserService);
    UserService.$inject = ['$http', 'UserFactory', '$mdToast', '$location'];
})();