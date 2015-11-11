'use strict';
var constantname = 'Foursquare';

module.exports = function(app) {
    var args = {
        BASE_URL: 'https://api.foursquare.com/v2',
        CLIENT_ID: '', // Replace with your client id
        CLIENT_SECRET: '', // Replace with your client secret
        V: '20151120',
        SW: '48.8396952,2.2399123000000145',
        NE: '48.894533,2.409629999999993',
        INTENT_BROWSE: 'browse',
        INTENT_CHECKIN: 'checkin',
        LAT_LNG: 'll',
        RADIUS: 'radius',
        LOCALE: 'fr'
    };
    app.constant(app.name + '.' + constantname, args);
};
