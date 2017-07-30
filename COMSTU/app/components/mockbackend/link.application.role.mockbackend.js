(function () {
    'use strict';



    function applicationUserRoleMockbackend($httpBackend, applicationDataModel, baseUrl, evoUrl) {
        /* jshint validthis:true */

        $httpBackend.whenGET(baseUrl + '/applications').respond(function () {
            var applications = applicationDataModel.getApplications();
            return [200, applications, {}];
        });

        $httpBackend.whenPUT(baseUrl + '/saveApplicationRoles').respond(function (method, url, data) {
            var editedApplicationRoles = angular.fromJson(data);
            var applications = applicationDataModel.saveApplicationRoles(editedApplicationRoles);
            return [200, applications, {}];
        });

        $httpBackend.whenGET(/redirects\//).passThrough();
        $httpBackend.whenGET(/blocks\//).passThrough();
        $httpBackend.whenGET(/linkApplication\//).passThrough();
        $httpBackend.whenGET(/application\//).passThrough();
        $httpBackend.whenPOST(baseUrl + '/connect/token').passThrough();
        $httpBackend.whenGET(baseUrl + '/Application/GetApplications').passThrough();
        //$httpBackend.whenGET('https://jhbh-dev-merii.bidvestbank.local:8082/EvoWebApiSprint/api/individualCustomer?uniqueNumber=9012035519087').passThrough();
        //$httpBackend.whenGET(new RegExp('https://jhbh-dev-merii.bidvestbank.local:8082' + '*')).passThrough();
        //$httpBackend.whenGET('https://jhbh-dev-merii.bidvestbank.local:8082/EvoWebApiSprint/api/individualCustomer/GetIndividualCustomer?id=254&mode=Maintain&role=CorporateAdmin').passThrough();
        //$httpBackend.whenGET('https://jhbh-dev-merii.bidvestbank.local:8082/EvoWebApiSprint/api/individualCustomer/GetIndividualCustomer?id=2&mode=Maintain&role=CorporateAdmin').passThrough();
        //$httpBackend.whenGET('https://localhost/EVOWebApi/api/individualCustomer?UniqueNumber=9012035519087').passThrough();
        //$httpBackend.whenGET('https://localhost/EVOWebApi/api/individualCustomer?UniqueNumber=8511136005186').passThrough();
        //$httpBackend.whenGET('https://jhbh-dev-merii.bidvestbank.local:8082/EvoWebApiSprint/api/individualCustomer/GetIndividualCustomer?id=260&mode=Maintain&role=CorporateAdmin').passThrough();
        //$httpBackend.whenGET('https://localhost/EVOWebApi/api/individualCustomer?UniqueNumber=8511136005186').passThrough();
        //$httpBackend.whenGET('https://localhost/EVOWebApi/api/individualCustomer?uniqueNumber=8002022591083').passThrough();
        $httpBackend.whenGET('https://localhost/EVOWebApi/api/individualCustomerIndividualCustomer?UniqueNumber=8511136005186').passThrough();
        $httpBackend.whenGET(baseUrl + '/Application/GetApplications').passThrough();
        $httpBackend.whenPOST('http://jhbh-dev-merii:8084/connect/token').passThrough();
        $httpBackend.whenPOST('https://localhost/EVOWebApi/api/*').passThrough();
        $httpBackend.whenPOST('http://jhbh-dev-merii:8089/api/*').passThrough();
        $httpBackend.whenPOST('http://jhbh-dev-merii:8092/api/*').passThrough();
        $httpBackend.whenGET(new RegExp('https://localhost/EVOWebApi/api' + '*')).passThrough();
        //$httpBackend.whenGET(new RegExp(evoUrl + '*')).passThrough();
        $httpBackend.whenGET('index.html').passThrough();


    }



    angular.module('AMApp').run(applicationUserRoleMockbackend);
})();
