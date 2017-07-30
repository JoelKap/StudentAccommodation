(function () {
    'use strict';



    function claimMockbackend($httpBackend, claimDataModel, baseUrl) {
        /* jshint validthis:true */


        $httpBackend.whenPOST(baseUrl + '/addClaim').respond(function (method, url, data) {
            var claim = angular.fromJson(data);
            var result = claimDataModel.addClaim(claim);
            return [200, result, {}];
        });

        $httpBackend.whenPOST(baseUrl + '/editClaim').respond(function (method, url, data) {
            var claim = angular.fromJson(data);
            var result = claimDataModel.editClaim(claim);
            return [200, result, {}];
        });

        $httpBackend.whenPOST(baseUrl + '/deleteClaim').respond(function (method, url, data) {
            var claim = angular.fromJson(data);
            var result = claimDataModel.deleteClaim(claim);
            return [200, result, {}];
        });

        $httpBackend.whenGET(baseUrl + '/getClaims').respond(function (method, url, data) {
            var applicationId = angular.fromJson(data);
            var result = claimDataModel.getClaimsByApplicationId(applicationId);
            return [200, result, {}];
        });
      


        $httpBackend.whenGET(/redirects\//).passThrough();
        $httpBackend.whenGET(/blocks\//).passThrough();
        $httpBackend.whenGET(/createclaim\//).passThrough();
        $httpBackend.whenGET(/claim\//).passThrough();

        $httpBackend.whenGET('index.html').passThrough();
    }



    angular.module('AMApp').run(claimMockbackend);
})();
