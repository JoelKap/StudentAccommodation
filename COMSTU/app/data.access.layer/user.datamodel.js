(function () {
    'use strict';

    function userDataModel($filter, helper) {

        this.users = [
        {
            userId: '2',
            name: 'Max',
            surname: 'Maake',
            username: 'Max.Maake',
            idNumber: '8203265987453',
            password: '',
            status: true,
            locked: false,
            cellNumber: '0796581263',
            email: 'max.maake@bidvest.com',
            additionalEmail: 'max.maake@gmail.com',
            passwordChanged: true,
           
            applications: [],
            activty: {
                lastLoginDate: '2016-02-04',
                lastActive: '2016-02-04',
                LastPasswordChangedDate: '2016-02-04',
                lastLockoutDate: '2016-02-04',
                lastUpdatedDate: '2016-02-04',
            }
        }]

        this.getUsers = function () {
            return this.users;
        }

        this.addUser = function (newUser) {

            if (newUser.id == undefined || newUser.id == '') {
                newUser.id = helper.getRandomizeId();

                for (var i = 0; i < this.users.length; i++) {
                    var user = this.users[i];
                    if (user.username == newUser.username) {
                        return false;
                    }
                }

                this.users.push(newUser);
                return true;
            }
            else {
                return this.editUser(newUser);
            }           
        }

        this.editUser = function (user) {           

            for (var i = 0; i < this.users.length; i++) {
                var thisUser = this.users[i];
                if (thisUser.id == user.id) {
                    this.users[i] = user;
                    return true;
                }
            }

            return false;           
        }

        this.resetUserPassword = function (userId ,password) {

            for (var i = 0; i < this.users.length; i++) {
                var thisUser = this.users[i];
                if (thisUser.id == userId) {
                    thisUser.password = password;
                    thisUser.passwordChanged = false;

                    this.users.push(thisUser);
                    return true;
                }
            }

            return false;
        }

        this.checkUniqueUsername = function (username) {
            for (var i = 0; i < this.users.length; i++) {
                var thisUser = this.users[i];
                if (thisUser.username == username) {
                    return true;
                }
            }
            return false;
        }

    }

    angular.module('AMApp').service('userDataModel', userDataModel);
    userDataModel.$inject = ['$filter', 'helper'];
})();