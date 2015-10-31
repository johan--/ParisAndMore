'use strict';

module.exports = function(app) {
    // inject:start
    require('./themes.controller')(app);
    require('./venue.controller')(app);
    require('./venues.controller')(app);
    // inject:end
};
