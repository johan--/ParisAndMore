'use strict';
var controllername = 'aroundVenues';
var popupTemplate = require('../views/around-popup.html');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', app.name + '.VenuesService', '$ionicLoading', 'main.common.MAPBOX', '$cordovaGeolocation', '$cordovaToast', '$state'];

    function controller($scope, VenuesService, $ionicLoading, MAPBOX, $cordovaGeolocation, $cordovaToast, $state) {
        var vm = this;
        vm.controllername = fullname;
        vm.getVenues = getVenues;
        vm.initMap = initMap;
        vm.activate = activate; 
        $scope.venue  = '';
        $scope.$on('leafletDirectiveMarker.click', function(e, args) {
            var themeObject = VenuesService.getSelectedTheme();
            VenuesService.getVenue({
                venueId: args.model.venueId
            }).then(function(result) {
                if(result.response.venue.bestPhoto) {
                    $scope.markerImage = 'https://irs0.4sqi.net/img/general/200x100' + result.response.venue.bestPhoto.suffix;
                } else {
                    console.log(themeObject);
                    $scope.markerImage = themeObject.theme.image;
                }
                $scope.markerName = result.response.venue.name;
                $scope.markerDescription = result.response.venue.description;
            });
            $scope.markerVenueId = args.model.venueId;
        });


        function activate() {
            //console.log(lat, lng);
            $ionicLoading.show({
                template: 'Chargement'
            });

            vm.initMap();
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                    .then(function(position) {
                        vm.center.lat = position.coords.latitude;
                        vm.center.lng = position.coords.longitude;
                        vm.getVenues(vm.center.lat, vm.center.lng);
                    }, function(err) {
                        $cordovaToast
                            .show(err, 'short', 'center')
                            .then(function(success) {
                                $state.go('app.home');
                            }, function(error) {
                            });
                    });
        }
        vm.activate();

        function getVenues(lat, lng) {
            var categories = VenuesService.getVenuesCats();

            VenuesService.getAroundVenues({
                categoryId: categories,
                latlng: lat + ',' + lng
            }).then(function(result) {
                vm.venues = result.response.venues;
                var length = vm.venues.length;
                console.log(vm.venues);
                vm.markers = [];
                for(var i = 0; i < length; i++) {
                    vm.markers.push({
                        venueId: vm.venues[i].id,
                        lat: vm.venues[i].location.lat,
                        lng: vm.venues[i].location.lng,
                        getMessageScope: function() { return $scope; },
                        message: popupTemplate
                    });
                }
                $ionicLoading.hide();
            });
        }

        function initMap() {
            vm.center = {
                lat: 48.853,
                lng: 2.35,
                zoom: 16
            };

            vm.layers = {
                baselayers: {
                    mapbox_terrain: {
                        name: 'Mapbox Terrain',
                        url: MAPBOX.URL,
                        type: MAPBOX.TYPE,
                        layerOptions: {
                            apikey: MAPBOX.API_KEY,
                            mapid: MAPBOX.MAP_ID
                        }
                    }
                }
            };

        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
