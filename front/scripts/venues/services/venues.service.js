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
                    categories: '4deefb944765f83613cdba6e,4bf58dd8d48988d18f941735,4bf58dd8d48988d190941735'
                },
                {
                    name: 'Art',
                    image: './images/app/themes/art.png',
                    // Art Gallery, Public Art
                    categories: '4bf58dd8d48988d18f941735,507c8c4091d498d9fc8c67a9'
                },
                {
                    name: 'Musique',
                    image: './images/app/themes/musique.png',
                    // Concert Hall, Music Venue
                    categories: '5032792091d4c4b30a586d5c,4bf58dd8d48988d1e5931735'
                },
                {
                    name: 'Soirée',
                    image: './images/app/themes/night.png',
                    // Nightlife Spot
                    categories: '4d4b7105d754a06376d81259'
                },
                {
                    name: 'Sport',
                    image: './images/app/themes/sport.png',
                    // Athletics & Sports
                    categories: '4f4528bc4b90abdf24c9de85'
                },
                {
                    name: 'Divertissement',
                    image: './images/app/themes/divertissement.png',
                    // Movie Theater
                    categories: '4bf58dd8d48988d17f941735'
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
