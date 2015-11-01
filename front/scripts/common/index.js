'use strict';
var angular = require('angular');
require('angular-ui-router');
require('angular-sanitize');
require('angular-animate');
require('ionic');
require('ionic-angular');
require('angular-material');
require('famous-angular');
require('ng-cordova');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var app = angular.module(fullname, ['ui.router', 'ionic', 'famous.angular', 'ngCordova', 'ngMaterial']);
    // inject:folders start
    require('./constants')(app);
require('./controllers')(app);
    // inject:folders end
    app.namespace = app.namespace || {};

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {



    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};
