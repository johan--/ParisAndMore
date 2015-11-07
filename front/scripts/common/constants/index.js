'use strict';

module.exports = function(app) {
    // inject:start
    require('./firebase.constant')(app);
    require('./foursquare.constant')(app);
    require('./mapbox.constant')(app);
    // inject:end
};