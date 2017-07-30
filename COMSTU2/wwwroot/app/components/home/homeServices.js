(function () {
    'use strict';



    function homeServices($http, $q, baseUrl, $sessionStorage) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'accommodation';
        var self = this;
        self.accommodation = {};


        this.assignAccommodation = function (acc) {
            self.accommodation = acc;
        }

        this.getAssignedAccommodation = function () {
            return self.accommodation;
        }

        this.getAccomodations = function () {
            var defered = $q.defer();

            var getAccComplete = function (response) {
                defered.resolve(response.data);
            }

            $http.get(baseUrl + '/Accommodation/GetAccommodation').then(getAccComplete, function (err, status) {
                defered.reject(err);
            });

            return defered.promise;
        }


    }
     
    angular.module('COMSTU').service('homeServices', homeServices)
    homeServices.$inject = ['$http', '$q', 'baseUrl', '$sessionStorage'];
})();
