'use strict';
var servicename = 'VenuesFactory';

module.exports = function(app) {
    var dependencies = ['main.common.Foursquare', '$resource'];

    function service(Foursquare, $resource) {
        var args = {
            client_id: Foursquare.CLIENT_ID,
            client_secret: Foursquare.CLIENT_SECRET,
            v: Foursquare.V,
            sw: Foursquare.SW,
            ne: Foursquare.NE,
            intent: Foursquare.INTENT_BROWSE
        };
        return $resource(Foursquare.BASE_URL, args, {
            getVenues: {
                method: 'GET',
                url: Foursquare.BASE_URL + '/venues/search?categoryId=:categoryId',
                params: {categoryId: '@categoryId'}
            },
            getVenue: {
                method: 'GET',
                url: Foursquare.BASE_URL + '/venues/search?categoryId=:categoryId',
                params: {venueId: '@venueId'}
            }
        });
    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
