(function () {
    'use strict';
    function userViewController($location, UserService) {
        /* jshint validthis:true */
        var vm = this;
        vm.icon = "person";
        vm.heading = "User Management";
        vm.users = [];
        alert('view users loaded');
       
        vm.pagenation = {
            limit: 10,
            page: 1
        };

        init();

        function init() {
           
            UserService.getUsers(function (data) {;
                vm.users = UserService.users;
            });
        }

        vm.addNewUser = function () {
            UserService.assignSelectedUser(undefined);
            $location.path('/addEditUser');
        };

        vm.editUser = function (user) {
            UserService.assignSelectedUser(user);
            $location.path('/addEditUser');
        };
    }

    angular.module('AMApp').controller('userViewController', userViewController);
    userViewController.$inject = ['$location', 'UserService'];
})();
