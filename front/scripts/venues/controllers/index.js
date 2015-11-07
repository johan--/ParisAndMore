'use strict';

module.exports = function(app) {
    // inject:start
    require('./around-venues.controller')(app);
    require('./likers.controller')(app);
    require('./themes.controller')(app);
    require('./venue.controller')(app);
    require('./venues.controller')(app);
    // inject:end
};
