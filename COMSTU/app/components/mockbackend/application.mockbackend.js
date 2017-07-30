(function () {
    'use strict';



    function applicationMockbackend($httpBackend, baseUrl) {
        /* jshint validthis:true */

        var url = 'https://www.sidpayment.com/paySID/'
        $httpBackend.whenGET(/redirects\//).passThrough();
        $httpBackend.whenGET(/blocks\//).passThrough();
        $httpBackend.whenGET(/createapplication\//).passThrough();
        $httpBackend.whenGET(/application\//).passThrough();
        $httpBackend.whenGET(/login\//).passThrough();
        $httpBackend.whenGET(/404\//).passThrough();
        $httpBackend.whenGET(/createAccount\//).passThrough();
        $httpBackend.whenPOST(new RegExp(baseUrl + '*')).passThrough();
        $httpBackend.whenPOST(new RegExp('https://localhost:3645//sidpayment.com/paySID/' + '*')).passThrough();
        $httpBackend.whenGET(new RegExp(baseUrl + '*')).passThrough();
        $httpBackend.whenPOST(new RegExp(url + '*')).passThrough();
        $httpBackend.whenGET(new RegExp(url + '*')).passThrough();

        $httpBackend.whenGET('index.html').passThrough();
    }



    angular.module('AMApp').run(applicationMockbackend);
})();
