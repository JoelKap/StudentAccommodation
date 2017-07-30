(function () {
    'use strict';


    function applicationLinkToRoles($location, linkApplicationService, UserService, modal, $scope, ApplicationFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'role';
        vm.selectedApplication = null;
        vm.lockSelectedValue = false;
        vm.showSearch = false;
        vm.roles = [];
        vm.linkRoles = true;
        vm.pageHeading = 'User Management - Link Application';
        vm.pageHeadingIcon = 'person';
        vm.applicationUserRoles = { roles: [] }
        vm.tabs = [{ id: 1, heading: 'Roles', hasBadges: false, badge: 0, active: true }, { id: 1, heading: 'Values', hasBadges: false, badge: 0, active: false }]
        vm.applications = linkApplicationService.applications;
        vm.selectedCustomer = {};
        vm.selectedCust = {};
        vm.sa = {};
        init();

        function init() {

            var selectedAppIndex = UserService.getSelectedAppIndex();
            var currentUser = UserService.userDetails;

            if (selectedAppIndex != undefined) {

                vm.lockSelectedValue = true;
                vm.selectedApplication = null;
                vm.selectedApplication = angular.copy(currentUser.applications[selectedAppIndex]);
                for (var i = 0; i < vm.selectedApplication.Claims.length; i++) {
                    var userClaim = vm.selectedApplication.Claims[i];
                    if (userClaim.claimName == 'user') {
                        vm.selectedCustomer = (userClaim.claimValue);
                    }
                }
                ApplicationFactory.getApplicationId(vm.selectedApplication.ApplicationId).then(function (data) {
                    for (var j = 0; j < data.length; j++) {
                        var app = data[j];
                        if (app.ApplicationId === vm.selectedApplication.ApplicationId) {
                            var appRoles = data[j].Roles;

                            for (var k = 0; k < appRoles.length; k++) {
                                var role = appRoles[k];
                                for (var l = 0; l < vm.selectedApplication.Roles.length; l++) {
                                    if (role.id !== vm.selectedApplication.Roles[l].id) {
                                        vm.selectedApplication.Roles.push(role);
                                    }
                                }
                            }
                        }

                    }

                });

                for (var i = 0; i < vm.selectedApplication.Claims.length; i++) {
                    //Put it back later
                    //&& vm.selectedApplication.Claims[i].claimName == 'company'
                    if (vm.selectedApplication.Claims[i].claimName == 'user') {
                        if (!vm.selectedApplication.Claims[i].claimValue) {
                            //vm.selectedApplication.Claims.splice(vm.selectedApplication.Claims[i], 1);
                            vm.selectedApplication.Claims[i].claimValue = (vm.selectedApplication.Claims[i].claimValue);
                        } else {
                            var sa = JSON.parse(vm.selectedApplication.Claims[i].claimValue);
                            vm.selectedCust = sa;
                            vm.selectedApplication.Claims[i].claimValue = vm.selectedApplication.Claims[i].claimValue;
                        }
                    }
                    //if(vm.selectedApplication.Claims.length > 0){

                    if (vm.selectedApplication.Claims[i].claimName == 'quoteRequestLimit') {
                        vm.selectedApplication.claimValue = vm.selectedApplication.Claims[i].claimValue;
                    }
                    if (vm.selectedApplication.Claims[i].claimName == 'paymentApprovalLimit') {
                        vm.selectedApplication.claimValue = vm.selectedApplication.Claims[i].claimValue;
                    }
                    //}
                }
                vm.applications = currentUser.applications;

            } else {
                vm.selectedApplication = null;
                setTimeout(function () {
                    if (currentUser.applications !== null) {
                        for (var i = 0; i < currentUser.applications.length; i++) {
                            for (var j = 0; j < vm.applications.length; j++) {
                                if (currentUser.applications[i].ApplicationId === vm.applications[j].ApplicationId) {
                                    vm.applications.splice(j, 1);
                                }
                            }
                        }
                    }
                }, 500, linkApplicationService.getApplicationData());
            }
        }
        vm.selectInvidividualCustomer = function () {
            var templateUrl = '/app/components/linkApplication/customerSearch/customers.template.html';
            modal.show(templateUrl, 'customerSearchController').then(function (customer) {
                // $scope.claim = {};
                // claim.claimValue
                if (customer) {
                    //vm.selectedApplication.Claims =
                    vm.selectedCustomer = customer;
                    for (var i = 0; i < vm.selectedApplication.Claims.length; i++) {
                        var sa = vm.selectedApplication.Claims[i]
                        if (sa.claimName == 'user') {
                            var cust = JSON.parse(customer);
                            vm.selectedCust = cust;
                            //vm.selectedApplication.Claims[i].claimValue = cust.FirstName;
                            //sa.claimValue = customer;
                        }
                    }
                }
            });
        }

        vm.quoteRequestLimitVisible = function () {
            for (var i = 0; i < vm.selectedApplication.Claims.length; i++) {
                if (vm.selectedApplication.Claims[i].claimName == 'quoteRequestLimit') {
                    return true;
                }
            }

            return false;
        }

        vm.paymentApprovalLimitVisible = function () {
            for (var i = 0; i < vm.selectedApplication.Claims.length; i++) {
                if (vm.selectedApplication.Claims[i].claimName == 'paymentApprovalLimit') {
                    return true;
                }
            }

            return false;
        }

        vm.Save = function () {
            // strigify claim value
            var currentUser = UserService.userDetails; //vm.selectedCustomer; //
            var added = vm.selectedCustomer;
            //for (var i = 0; i < vm.selectedApplication.Claims.length; i++) {
            //    if (vm.selectedApplication.Claims[i].claimValue && vm.selectedApplication.Claims[i].claimName == 'user') {
            //        vm.selectedApplication.Claims[i].claimValue = JSON.stringify(vm.selectedApplication.Claims[i].claimValue);
            //    }

            //}
            var foundExistingUser = false;


            //for (var i = 0; i < vm.selectedApplication.Claims.length; i++) {
            //    if (vm.selectedApplication.Claims[i].claimName == 'user') {
            //        vm.selectedApplication.Claims[i].claimValue = JSON.stringify(added);
            //    }
            //}

            for (var i = 0; i < vm.selectedApplication.Claims.length; i++) {
                if (vm.selectedApplication.Claims[i].claimName == 'user') {
                    if (added != "") {
                        vm.selectedApplication.Claims[i].claimValue =  Object.keys(added).length === 0 ? "" : added;
                        foundExistingUser = true;
                        break;
                    }
                    else
                    {
                        if (vm.selectedApplication.Claims[i].claimValue != "") {
                            foundExistingUser = true;
                            break;
                        }
                    }
                   

                }
            }
            if (foundExistingUser) {
                if (typeof vm.selectedApplication.Claims[i].claimValue.CustomerId === 'undefined') {
                    vm.selectedApplication.Claims[i].claimValue = Object.keys(added).length === 0 ? "" : added;

                }
                else {
                    vm.selectedApplication.Claims[i].claimValue = JSON.stringify(added);
                }
            }
            else {
                vm.selectedApplication.Claims.push({
                    claimName: 'user',
                    claimValue: added != "" ? JSON.stringify(added) : added
                });
            }




            UserService.linkUserToTheUpdateApplication(vm.selectedApplication, currentUser);
        }

        vm.activeTab = function (tab) {
            if (tab === 'linkRoles') {
                vm.linkRoles = true;
                vm.linkValues = false;
            } else if (tab === 'linkValues') {
                vm.linkRoles = false;
                vm.linkValues = true;
            }

        };

        vm.addCustomer = function () {
            linkApplicationService.assignCurrentClaim({});
            linkApplicationService.setSelectedApplication(vm.selectedApplication);
            var templateUrl = '/app/components/linkapplication/claim/claim.link.html';
            modal.show(templateUrl, 'LinkApplicationClaimController');
        }

        vm.deleteCustomer = function (index) {
            vm.selectedApplication.Claims.splice(index, 1);
        }

        vm.companyAndHasValue = function (item) {
            return item.claimName === 'company' && !(item.claimValue === null || item.claimValue === "");
        }

        vm.cancel = function () {
            var selectedAppIndex = UserService.getSelectedAppIndex();
            var currentUser = UserService.userDetails;
            vm.selectedApplication = angular.copy(currentUser.applications[selectedAppIndex]);

            $location.path('/addEditUser')
        }

        vm.back = function () {

            $location.path('/addEditUser')
        }


    }

    angular.module('AMApp').controller('applicationLinkToRoles', applicationLinkToRoles);
    applicationLinkToRoles.$inject = ['$location', 'LinkApplicationService', 'UserService', 'modal', '$scope', 'ApplicationFactory'];
})();
