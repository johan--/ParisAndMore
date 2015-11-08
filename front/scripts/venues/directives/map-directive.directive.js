'use strict';
 /*eslint consistent-this:[2,  "mapDirectiveCtrl"] */
var directivename = 'mapDirective';
var $ = require('jquery');

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var mapDirectiveCtrl = this;
        mapDirectiveCtrl.directivename = directivename;
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = ['main.common.MAPBOX'];
    var directive = function(MAPBOX) {
        return {
            restrict: 'AE',
            scope: {
                title: '@' // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
            },
            controller: controller,
            controllerAs: 'mapDirectiveCtrl',
            bindToController: true,
            link: function(scope, element, attrs) {
                var map = L.map(element[0]).setView([51.505, -0.09], 13);

                $(element).closest('#direction-content').find('.direction-panel').on('click', function() {
                    $(element).find('.leaflet-routing-container').toggleClass('direction-panel-open');
                });

                L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    center: [0, 0],
                    maxZoom: 18,
                    id: MAPBOX.MAP_ID,
                    accessToken: MAPBOX.API_KEY
                }).addTo(map);

                L.Icon.Default.imagePath = '../../../icons/app';
                var marker = L.marker([51.5, -0.09]).addTo(map);

                L.Routing.control({
                    waypoints: [
                        L.latLng(57.74, 11.94),
                        L.latLng(57.6792, 11.949)
                    ],
                    showAlternatives: true,
                    router: L.Routing.mapbox('pk.eyJ1IjoiZ2VvZmZyZXlwbCIsImEiOiJjaWducG90ZDUwMDNqbHVrdDZtM2xmNGs0In0.KeeItsK30xU8aEOAcFBpGw', {
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


            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
