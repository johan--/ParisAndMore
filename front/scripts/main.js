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
require('angular-moment');
require('moment/locale/fr');
require('angular-material-icons');
require('leaflet');
require('angular-leaflet-directive');
require('firebase');
require('angularfire');
require('ionic');
require('ionic-angular');
require('angular-material');
var app = angular.module(namespace, [
    'ionic',
    'ngMaterial',
    'firebase',
    'ngMdIcons',
    'angularMoment',
    'leaflet-directive',
    // inject:modules start
    require('./common')(namespace).name,
    require('./login')(namespace).name,
    require('./users')(namespace).name,
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

run.$inject = ['$ionicPlatform', '$rootScope', '$window'];
function run($ionicPlatform, $window) {

    $ionicPlatform.ready(function() {
        //moment.locale('fr');
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
            template: require('./common/views/menu.html'),
            controller: 'main.common.menu as menuCtrl'
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
        .state('app.signup', {
            url: '/signup',
            views: {
                'menuContent': {
                    template: require('./login/views/signup.html'),
                    controller: 'main.login.signup as signupCtrl'
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    template: require('./login/views/profile.html'),
                    controller: 'main.login.profile as profileCtrl'
                }
            }
        })
        .state('app.profiles', {
            url: '/profile/:userId',
            views: {
                'menuContent': {
                    template: require('./login/views/profiles.html'),
                    controller: 'main.login.profiles as profilesCtrl'
                }
            }
        })
        .state('app.rooms', {
            url: '/rooms',
            views: {
                'menuContent': {
                    template: require('./users/views/rooms.html'),
                    controller: 'main.users.rooms as roomsCtrl'
                }
            }
        })
        .state('app.room', {
            url: '/rooms/:roomId',
            views: {
                'menuContent': {
                    template: require('./users/views/room.html'),
                    controller: 'main.users.room as roomCtrl'
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
                    template: require('./venues/views/venue.html'),
                    controller: 'main.venues.venue as venueCtrl'
                }
            }
        })
        .state('app.aroundThemes', {
            url: '/aroundThemes',
            views: {
                'menuContent': {
                    template: require('./venues/views/around-themes.html'),
                    controller: 'main.venues.themes as themesCtrl'
                }
            }
        })
        .state('app.aroundVenues', {
            url: '/aroundVenues',
            views: {
                'menuContent': {
                    template: require('./venues/views/around-venues.html'),
                    controller: 'main.venues.aroundVenues as aroundVenuesCtrl'
                }
            }
        });
}

app.run(run);
app.config(config);

module.exports = app;
