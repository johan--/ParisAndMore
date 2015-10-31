'use strict';
var servicename = 'VenuesService';

module.exports = function(app) {

    var dependencies = [app.name + '.VenuesFactory'];

    function service(VenuesFactory) {

        var venuesCategories = '';
        var venueId = '';

        function Service() {}

        Service.prototype = {
            getThemes: getThemes,
            getVenues: getVenues,
            setVenuesCats: setVenuesCats,
            getVenuesCats: getVenuesCats,
            setVenue: setVenue
        };

        return new Service();

        function getThemes() {
            var themes = [
                {
                    name: 'Culture',
                    image: null,
                    // Related to foursquare categories id
                    // https://developer.foursquare.com/categorytree
                    // Art Gallery, Historic Site, Art Museum, History Museum
                    categories: '4bf58dd8d48988d18f941735,4deefb944765f83613cdba6e,4bf58dd8d48988d18f941735,4bf58dd8d48988d190941735'
                },
                {
                    name: 'La Journée',
                    image: null
                },
                {
                    name: 'La Nuit',
                    image: null
                }
            ];

            return themes;
        }

        function getVenues(params) {
            return VenuesFactory.getVenues(params).$promise;
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

        function setVenue(id) {
            venueId = id;
        }
    }

    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);

};
