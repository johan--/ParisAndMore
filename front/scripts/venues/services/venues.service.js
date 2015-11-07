'use strict';
var servicename = 'VenuesService';

module.exports = function(app) {

    var dependencies = [app.name + '.VenuesFactory'];

    function service(VenuesFactory) {

        var venuesCategories = '';
        var venueId = '';
        var selectedTheme = {};

        function Service() {}

        Service.prototype = {
            getThemes: getThemes,
            getVenues: getVenues,
            getAroundVenues: getAroundVenues,
            getVenue: getVenue,
            setVenuesCats: setVenuesCats,
            getVenuesCats: getVenuesCats,
            getSelectedTheme: getSelectedTheme,
            setSelectedTheme: setSelectedTheme
        };

        return new Service();

        function getThemes() {
            var themes = [
                {
                    name: 'Culture',
                    image: './images/app/themes/culture.png',
                    // Related to foursquare categories id
                    // https://developer.foursquare.com/categorytree
                    // Art Gallery, Historic Site, Art Museum, History Museum
                    categories: '4bf58dd8d48988d18f941735,4deefb944765f83613cdba6e,4bf58dd8d48988d18f941735,4bf58dd8d48988d190941735'
                },
                {
                    name: 'Art',
                    image: './images/app/themes/art.png'
                },
                {
                    name: 'Musique',
                    image: './images/app/themes/musique.png'
                },
                {
                    name: 'Soirée',
                    image: './images/app/themes/night.png'
                },
                {
                    name: 'Sport',
                    image: './images/app/themes/sport.png'
                },
                {
                    name: 'Divertissement',
                    image: './images/app/themes/divertissement.png'
                }
            ];

            return themes;
        }

        function getVenues(params) {
            return VenuesFactory.getVenues(params).$promise;
        }

        function getAroundVenues(params) {
            return VenuesFactory.getAroundVenues(params).$promise;
        }

        function getVenue(params) {
            return VenuesFactory.getVenue(params).$promise;
        }

        function setVenuesCats(cats) {
            venuesCategories = cats;
        }

        function getVenuesCats() {
            return venuesCategories;
        }

        function getSelectedTheme() {
            return selectedTheme;
        }

        function setSelectedTheme(theme) {
            selectedTheme = theme;
        }

    }

    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);

};
