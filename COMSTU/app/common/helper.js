(function () {
    'use strict';

    function helper($filter) {

        this.getRandomizeId = function () {
            var id = Math.floor(Math.random() * 999999) + 1;

            return id;
        }

        this.generatePassword = function () {

            var password = "";
            var possibleUppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                possibleNumber = "0123456789",
                possibleCharacter = "{}#,!_@^():.|$[];?+-/*~%",
                possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}#,!_@^():.|$[];?+-/*~%";

            password += possibleUppercaseLetters.charAt(Math.floor(Math.random() * possibleUppercaseLetters.length));
            password += possibleNumber.charAt(Math.floor(Math.random() * possibleNumber.length));

            for (var i = 0; i < 5; i++)
                password += possible.charAt(Math.floor(Math.random() * possible.length));

            password += possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length));


            return password;
        }
        
    }


    angular.module('AMApp').service('helper', helper);
    helper.$inject = ['$filter'];
}

());