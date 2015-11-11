'use strict';
 /*eslint consistent-this:[2,  "mapDirectiveCtrl"] */
var directivename = 'mapDirective';
var $ = require('jquery');

module.exports = function(app) {

    // controller
    var controllerDeps = ['$scope'];
    var controller = function($scope) {
        var mapDirectiveCtrl = this;
        mapDirectiveCtrl.directivename = directivename;
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = ['main.common.MAPBOX', '$cordovaGeolocation', '$stateParams', 'main.venues.VenuesService', '$ionicLoading'];
    var directive = function(MAPBOX, $cordovaGeolocation, $stateParams, VenuesService, $ionicLoading) {
        return {
            restrict: 'AE',
            scope: {
                title: '@' // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
            },
            controller: 'main.venues.venue',
            controllerAs: 'venueCtrl',
            bindToController: true,
            link: function(scope, element, attrs) {
                $ionicLoading.show({
                    template: 'Calcul de l\'itinéraire...'
                });
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                .getCurrentPosition(posOptions)
                    .then(function(position) {
                        var myLat = position.coords.latitude;
                        var myLng = position.coords.longitude;
                        VenuesService.getVenue({
                            venueId: $stateParams.venueId
                        }).then(function(result) {
                            $ionicLoading.hide();
                            var venue = result.response.venue;
                            var map = L.map(element[0]).setView([venue.location.lat, venue.location.lng], 13);

                            $(element).closest('#direction-content').find('.direction-panel').on('click', function() {
                                $(element).find('.leaflet-routing-container').toggleClass('direction-panel-open');
                            });

                            L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                                center: [0, 0],
                                maxZoom: 18,
                                id: MAPBOX.MAP_ID,
                                accessToken: MAPBOX.API_KEY
                            }).addTo(map);

                            L.Icon.Default.imagePath = './icons/app';

                            L.Routing.control({
                                waypoints: [
                                    L.latLng(venue.location.lat, venue.location.lng),
                                    L.latLng(myLat, myLng)
                                ],
                                showAlternatives: true,
                                router: L.Routing.mapbox('', { // Replace with you API key
                                    profile: 'mapbox.walking',
                                    alternatives: true,
                                    steps: false
                                }),
                                itineraryFormatter: L.Routing.ItineraryBuilder({
                                    createContainer: function() {
                                        return '<div></div>';
                                    }
                                }),
                                routeWhileDragging: false,
                                language: 'fr',
                                containerClassName: 'custom-container',
                                summaryTemplate: '<div class="direction-panel-header"><h2>{name}</h2><h3>{distance}, {time}</h3></div>'
                            }).addTo(map);
                        });
                    }, function(err) {
                        $cordovaToast
                            .show(err, 'short', 'center')
                            .then(function(success) {
                                $state.go('app.home');
                            }, function(error) {
                            });
                    });
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
