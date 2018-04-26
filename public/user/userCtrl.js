'use strict';

angular.module('myApp.user', ['ngRoute', 'ngDialog'])
    .controller('UserCtrl', function ($scope, $rootScope, $location, User, ngDialog) {

        $scope.users = [];
        $scope.allUsers = true;

        $scope.newUser = {
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            dateBirth: null
        };

        $scope.selectUser = {
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            dateBirth: null
        };

        $scope.typeDialog = null;

        User.getAllUsers();
        $rootScope.$on('getAllUsers', function (e, data) {
            $scope.users = data;
        });

        $rootScope.$on('closePopoup', function (e, data) {
            closeDialog();
            $scope.newUser = {
                firstName: null,
                lastName: null,
                email: null,
                phone: null,
                dateBirth: null
            };
            $scope.selectUser = {
                firstName: null,
                lastName: null,
                email: null,
                phone: null,
                dateBirth: null
            };

        });



        $scope.createUser = function () {
            $scope.typeDialog = 'create';
            showDialog()
        };
         $scope.updateUserInfo = function (user) {
             $scope.typeDialog = 'update';
             $scope.selectUser = {
                 firstName: user.firstName,
                 lastName: user.lastName,
                 email: user.email,
                 phone: user.phone,
                 dateBirth: user.dateBirth,
                 _id: user._id
             };
            showDialog()
        };

        function showDialog() {
            ngDialog.open({
                template: '../popup/popupTmpl.html',
                scope: $scope,
                controller: ['$scope', function($scope) {
                        $( "#datepicker" ).datepicker();

                    function formatDate(date) {

                        var dd = date.getDate();
                        if (dd < 10) dd = '0' + dd;

                        var mm = date.getMonth() + 1;
                        if (mm < 10) mm = '0' + mm;

                        var yy = date.getFullYear() % 100;
                        if (yy < 10) yy = '0' + yy;

                        return dd + '.' + mm + '.' + yy;
                    }

                    var msUTC = new Date(Date.parse($scope.selectUser.dateBirth));
                    var shortDate = new Date(msUTC.getFullYear(), msUTC.getMonth(), msUTC.getDate())
                    $scope.selectUser.dateBirth = formatDate(shortDate);

                    $scope.createNewUser = function (user) {
                        User.newUser($scope.newUser);
                    };
                    $scope.updateUser = function () {
                        User.updateUser($scope.selectUser._id, $scope.selectUser)
                    };
                    $scope.deleteUser = function () {
                        User.deleteUser($scope.selectUser._id, $scope.selectUser)
                    };
                }]
            });
        }

        function closeDialog() {
            ngDialog.close(ngDialog)
        }
    });