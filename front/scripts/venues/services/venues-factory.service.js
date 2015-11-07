'use strict';
var servicename = 'VenuesFactory';

module.exports = function(app) {
    var dependencies = ['main.common.Foursquare', '$resource'];

    function service(Foursquare, $resource) {
        return $resource(Foursquare.BASE_URL, {}, {
            getVenues: {
                method: 'GET',
                url: Foursquare.BASE_URL + '/venues/search?categoryId=:categoryId',
                params: {
                    categoryId: '@categoryId',
                    client_id: Foursquare.CLIENT_ID,
                    client_secret: Foursquare.CLIENT_SECRET,
                    v: Foursquare.V,
                    sw: Foursquare.SW,
                    ne: Foursquare.NE,
                    locale: Foursquare.LOCALE,
                    intent: Foursquare.INTENT_BROWSE
                }
            },
            getVenue: {
                method: 'GET',
                url: Foursquare.BASE_URL + '/venues/:venueId',
                params: {
                    client_id: Foursquare.CLIENT_ID,
                    client_secret: Foursquare.CLIENT_SECRET,
                    locale: Foursquare.LOCALE,
                    v: Foursquare.V
                }
            },
            getAroundVenues: {
                method: 'GET',
                url: Foursquare.BASE_URL + '/venues/search?categoryId=:categoryId&ll=:latlng',
                params: {
                    categoryId: '@categoryId',
                    client_id: Foursquare.CLIENT_ID,
                    client_secret: Foursquare.CLIENT_SECRET,
                    v: Foursquare.V,
                    ll: '@latlng',
                    intent: Foursquare.INTENT_CHECKIN,
                    radius: '500'
                }
            }
        });
    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
