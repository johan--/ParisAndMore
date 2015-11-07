'use strict';
var constantname = 'MAPBOX';

module.exports = function(app) {
    var args = {
        URL: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        TYPE: 'xyz',
        API_KEY: 'pk.eyJ1IjoiZ2VvZmZyZXlwbCIsImEiOiJjaWducG90ZDUwMDNqbHVrdDZtM2xmNGs0In0.KeeItsK30xU8aEOAcFBpGw',
        MAP_ID: 'geoffreypl.o3do1117',
    };
    app.constant(app.name + '.' + constantname, args);
};
