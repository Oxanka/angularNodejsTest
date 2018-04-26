'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngDialog',
    'myApp.user',
    'myApp.config',
    'myApp.services',
    'myApp.directive',
    'underscore'
])
    .config(function ($locationProvider, $routeProvider, $httpProvider, $logProvider) {


        $logProvider.debugEnabled(false);
        // console.log = function () {};

        $locationProvider.html5Mode(true);
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider.when('/',
            {
                templateUrl: 'user/user.html',
                controller: 'UserCtrl'
            })
            .otherwise({redirectTo: "/"});


    })
    .run(function ($rootScope, $location) {
        $location.path('/');
    })
