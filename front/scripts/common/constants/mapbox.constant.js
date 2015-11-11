'use strict';
var constantname = 'MAPBOX';

module.exports = function(app) {
    var args = {
        URL: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        TYPE: 'xyz',
        API_KEY: '', // Replace with your API key
        MAP_ID: '', // Replace with your map id
    };
    app.constant(app.name + '.' + constantname, args);
};
