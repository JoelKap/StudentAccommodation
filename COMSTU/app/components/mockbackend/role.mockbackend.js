(function () {
    'use strict';



    function roleMockbackend($httpBackend, roleDataModel, baseUrl) {
        /* jshint validthis:true */


        $httpBackend.whenPOST(baseUrl + '/addRole').respond(function (method, url, data) {
            var role = angular.fromJson(data);
            var result = roleDataModel.addRole(role);
            return [200, result, {}];
        });

        $httpBackend.whenPOST(baseUrl + '/editRole').respond(function (method, url, data) {
            var role = angular.fromJson(data);
            var result = roleDataModel.editRole(role);
            return [200, result, {}];
        });

        $httpBackend.whenPOST(baseUrl + '/deleteRole').respond(function (method, url, data) {
            var role = angular.fromJson(data);
            var result = roleDataModel.deleteRole(role);
            return [200, result, {}];
        });

        $httpBackend.whenGET(baseUrl + '/getRoles').respond(function (method, url, data) {
            var applicationId = angular.fromJson(data);
            var result = roleDataModel.getRolesByApplicationId(applicationId);
            return [200, result, {}];
        });


        $httpBackend.whenGET(/redirects\//).passThrough();
        $httpBackend.whenGET(/blocks\//).passThrough();
        $httpBackend.whenGET(/createrole\//).passThrough();
        $httpBackend.whenGET(/alert\//).passThrough();
        $httpBackend.whenGET(/role\//).passThrough();
        $httpBackend.whenGET(/pageheader\//).passThrough();
        $httpBackend.whenGET('index.html').passThrough();
    }



    angular.module('AMApp').run(roleMockbackend);
})();
