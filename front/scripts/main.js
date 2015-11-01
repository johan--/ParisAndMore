'use strict';

var namespace = 'main';
// fix protractor issue
if (window.location.toString().indexOf('localhost:5555') > 0) {
    window.name = 'NG_DEFER_BOOTSTRAP!NG_ENABLE_DEBUG_INFO!';
}
var angular = require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-sanitize');
require('angularfire');
require('ionic');
require('ionic-angular');
require('angular-material');
var app = angular.module(namespace, ['ionic', 'ngMaterial', 'firebase',
    // inject:modules start
    require('./common')(namespace).name,
    require('./login')(namespace).name,
    require('./venues')(namespace).name
    // inject:modules end
]);

if (process.env.SENTRY_MODE === 'prod') {
    var configCompileDeps = ['$compileProvider'];
    var configCompile = function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    };
    configCompile.$inject = configCompileDeps;
    app.config(configCompile);
}

run.$inject = ['$ionicPlatform', '$window'];
function run($ionicPlatform, $window) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if ($window.cordova && $window.cordova.plugins.Keyboard) {
            $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if ($window.StatusBar) {
            $window.StatusBar.styleDefault();
        }
        if ($window.TestFairy) {
            $window.TestFairy.begin(process.env.TESTFAIRY_IOS_APP_TOKEN);
        }
    });
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];
function config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');

    $urlRouterProvider.otherwise('/app/home');

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            template: require('./common/views/menu.html')
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    template: require('./common/views/home.html'),
                    controller: 'main.common.home as homeCtrl'
                }
            }
        })
        .state('app.themes', {
            url: '/themes',
            views: {
                'menuContent': {
                    template: require('./venues/views/themes.html'),
                    controller: 'main.venues.themes as themesCtrl'
                }
            }
        })
        .state('app.venues', {
            url: '/venues',
            views: {
                'menuContent': {
                    template: require('./venues/views/venues.html'),
                    controller: 'main.venues.venues as venuesCtrl'
                }
            }
        })
        .state('app.venue', {
            url: '/venues/:venueId',
            views: {
                'menuContent': {
                    template: require('./venues/views/venues.details.html'),
                    controller: 'main.venues.venue as venueCtrl'
                }
            }
        });
}

app.run(run);
app.config(config);

module.exports = app;
