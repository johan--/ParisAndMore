'use strict';
var constantname = 'Foursquare';

module.exports = function(app) {
    var args = {
        BASE_URL: 'https://api.foursquare.com/v2',
        CLIENT_ID: '0F5QKVZBK0OVJ2ZUKCIKY4GO1HAYPOPV4LROWI4QLFLIRP31',
        CLIENT_SECRET: 'QHYGRTPC2D12GDCLJTFMO0FJARNR2NGEO331BNOL2YGNSUGU',
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
