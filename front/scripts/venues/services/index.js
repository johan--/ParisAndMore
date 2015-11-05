'use strict';

module.exports = function(app) {
    // inject:start
    require('./venues-factory.service')(app);
    require('./venues.service')(app);
    // inject:end
};
