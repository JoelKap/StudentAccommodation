(function () {
    'use strict';

   

    function userMockbackend($httpBackend, userDataModel, baseUrl) {
        /* jshint validthis:true */
        $httpBackend.whenGET(baseUrl + '/users').respond(function () {
            var users = userDataModel.getUsers();
            return [200, users, {}];
        });

        $httpBackend.whenPOST(baseUrl + '/addUser').respond(function (method, url, data) {
            var user = angular.fromJson(data);
            var result = userDataModel.addUser(user);
            return [200, result, {}];
        });

        $httpBackend.whenPOST(baseUrl + '/resetUserPassword').respond(function (method, url, data) {
            var obj = angular.fromJson(data);
            var result = userDataModel.resetUserPassword(obj.userId, obj.password);
            return [200, result, {}];
        });

        $httpBackend.whenPOST(baseUrl + '/editUser').respond(function (method, url, data) {
            var user = angular.fromJson(data);
            var result = userDataModel.editUser(user);
            return [200, result, {}];
        });

        $httpBackend.whenPUT(baseUrl + '/checkUniqueUsername').respond(function (method, url, data) {
            var username = data;
            var result = userDataModel.checkUniqueUsername(username);
            return [200, result, {}];
        });


        $httpBackend.whenGET(/redirects\//).passThrough();  
        $httpBackend.whenGET(/blocks\//).passThrough();
        $httpBackend.whenGET(/user\//).passThrough();
        $httpBackend.whenGET(/application\//).passThrough();
        $httpBackend.whenGET(baseUrl + '/User/GetUsers').passThrough();
        $httpBackend.whenPOST(baseUrl + '/User/CreateUser').passThrough();
        $httpBackend.whenPUT(baseUrl + '/User/UpdateUser').passThrough();
        $httpBackend.whenPUT(baseUrl + '/User/ResetUserPassword').passThrough();
        $httpBackend.whenPUT(baseUrl + '/User/CheckUniqueUsername').passThrough();
        $httpBackend.whenPUT(baseUrl + '/User/sendUserDetails').passThrough();
        $httpBackend.whenGET(baseUrl + '/LogIn/DowloadDepositSlip').passThrough();

        $httpBackend.whenGET('index.html').passThrough();
    }

    

    angular.module('AMApp').run(userMockbackend);
})();
