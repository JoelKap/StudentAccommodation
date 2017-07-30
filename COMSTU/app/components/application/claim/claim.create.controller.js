(function () {
    'use strict';

    function claimCreateController($location, applicationService, claimService,claimFactory, helper, modal, $scope, $rootScope, $mdToast) {
        /* jshint validthis:true */

        var vm = this;
        //$scope.title = 'applicationCreateController';
        $scope.pageHeading = 'Create/Edit Claim';
        $scope.pageHeadingIcon = "playlist_add_check";

        $scope.claim = {};
        $scope.isApplicationEdit = false;
        $scope.application = {};
        $scope.formSubmitted = false;
        $scope.isClaimEdit = false;
        $scope.claimNameIsNotUnique = false;
        $scope.claimNameIsLowerCase = true;
        $scope.claimNameHasSpace = false;
        init();

        function init() {

            $scope.application = applicationService.getCurrentApplication();
            $scope.claim = claimService.getCurrentClaim();
            //$scope.checkIfEdit($scope.claim);
            if ($scope.claim.claimName == undefined || $scope.claim.claimName == '') {
                $scope.isClaimEdit = false;
            }

            else {
                $scope.isClaimEdit = true;
            }
        }


        $scope.checkIfEdit = function (claim)
        {
            if (claim.claimId == undefined || claim.claimId == '')
            {
                $scope.isClaimEdit = false;
            }

            else {
                $scope.isClaimEdit = true;
            }
        }


        $scope.checkSpaces = function (claim)
        {
            if (claim.claimName != undefined || claim.claimName != '') {
                if (claim.claimName.indexOf(' ') >= 0) {
                    $scope.claimNameHasSpace = true;
                }

                else {
                    $scope.claimNameHasSpace = false;

                }
            }
        }

        $scope.checkLowercase = function (claim)
        {
            if (claim.claimName != undefined || claim.claimName != '') {
                for (var i = 0; i < claim.claimName.length; i++) {
                    if (claim.claimName.charAt(i) !== " " && claim.claimName.charAt(i) == claim.claimName.charAt(i).toUpperCase() && claim.claimName.charAt(i) !== '_' && isNaN(claim.claimName.charAt(i))) {
                        $scope.claimNameIsLowerCase = false;
                        return;
                    }

                }
                $scope.claimNameIsLowerCase = true;
            }
        }

        $scope.checkUniqueness = function (claim)
        {
            if(claim.allowMultiples==true)
            {
                $scope.claimNameIsNotUnique = false;
                return;
            }

            else {
                if (claim.claimName != undefined || claim.claimName != '') {
                    if ($scope.application.Claims != undefined && $scope.application.Claims.length > 0) {
                        for (var i = 0; i < $scope.application.Claims.length; i++) {
                            if ($scope.application.Claims[i].claimName == claim.claimName) {
                                $scope.claimNameIsNotUnique = true;
                                return;
                            }

                        }
                        $scope.claimNameIsNotUnique = false;
                    }
                    
                }
            }
            
        }

        $scope.add = function (claim) {
            $scope.formSubmitted = true;
            if (claim.claimName == '' || claim.claimName == undefined)
            {
                $mdToast.show(
                                   $mdToast.simple()
                                  .textContent('Enter all required information')
                                  .hideDelay(3000)
                                   );

                return;
            }
            if ($scope.claimNameIsNotUnique == false && $scope.claimNameIsLowerCase == true && $scope.claimNameHasSpace==false)
            {
                claimFactory.addClaim(claim);
                $mdToast.show(
                                    $mdToast.simple()
                                   .textContent('Value successfully saved')
                                   .hideDelay(3000)
                                    );
                $scope.closeModal();
            }
            
            else {
                $mdToast.show(
                                   $mdToast.simple()
                                  .textContent('Enter all required information')
                                  .hideDelay(3000)
                                   );

                return;
            }
            
        }



        $scope.edit = function (claim) {
            $scope.formSubmitted = true;
            if (claim.claimName == '' || claim.claimName == undefined) {
                $mdToast.show(
                                   $mdToast.simple()
                                  .textContent('Enter all required information')
                                  .hideDelay(3000)
                                   );

                return;
            }

            if ($scope.claimNameIsNotUnique == false && $scope.claimNameIsLowerCase == true && $scope.claimNameHasSpace == false) {
                claimFactory.editClaim(claim);
                $mdToast.show(
                                    $mdToast.simple()
                                   .textContent('Value successfully saved')
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

    angular.module('AMApp').controller('claimCreateController', claimCreateController);
    claimCreateController.$inject = ['$location', 'applicationService', 'claimService','claimFactory', 'helper', 'modal', '$scope', '$rootScope', '$mdToast'];

})();