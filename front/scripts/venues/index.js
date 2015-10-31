'use strict';
var angular = require('angular');
require('angular-ui-router');
require('angular-resource');
require('angular-sanitize');
require('angular-animate');
require('ionic');
require('ionic-angular');
require('angular-material');
require('famous-angular');
require('ng-cordova');

var modulename = 'venues';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var app = angular.module(fullname, ['ui.router', 'ionic', 'famous.angular', 'ngCordova', 'ngMaterial', 'ngResource']);
    // inject:folders start
    require('./controllers')(app);
    require('./services')(app);
    // inject:folders end
    app.namespace = app.namespace || {};

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: require('./views/home.html'),
                controller: fullname + '.themes as themesCtrl'
            })
            .state('venues', {
                url: '/venues',
                template: require('./views/venues.html'),
                controller: fullname + '.venues as venuesCtrl',
                //params: {urlParams: null}
            })
            .state('venue', {
                url: '/venues/:venueId',
                template: require('./views/venues.details.html'),
                controller: fullname + '.venue as venueCtrl'
            });

    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};
