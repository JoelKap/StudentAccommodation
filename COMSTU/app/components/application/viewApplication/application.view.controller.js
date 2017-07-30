(function () {
    'use strict';
    
    function applicationViewController($scope, $location, ApplicationFactory, applicationService) {
        var vm = this;
        var colors = ["rgba(122,0,38,1.0)", "rgba(0,91,127,1.0)", "rgba(249,173,129,1.0)", "rgba(122,204,200,1.0)", "rgba(0,166,81,1.0)", "rgba(140,98,57,1.0)"];
        vm.applications = [];
        vm.icon = "assignment";
        vm.heading = "Application Management";
        vm.addNewApplicaton = function () {
            $location.path('/createApplication');
        }
        function getRandomColor()
        {
            return colors[Math.floor((Math.random() * colors.length))];
        }

        init()

        function init() {
            applicationService.assignCurrentApplication({ ApplicationId: '', Name: '', Accronym: '', Claims: [], Roles: [] });
            ApplicationFactory.getApplications().then(function (response) {
                if (response) {;
                    //vm.applications = response;

                    for (var i = 0; i < response.length; i++) {
                        response[i].color = getRandomColor();
                        vm.applications.push(response[i]);
                    }
                }
            }, function (error) { });
           
        }

        vm.editApplication = function (application)
        {
            applicationService.assignCurrentApplication(application);
            $location.path('/createApplication');
        }
    }

    angular.module('AMApp').controller('applicationViewController', applicationViewController);
    applicationViewController.$inject = ['$scope', '$location', 'ApplicationFactory', 'applicationService'];

})();
