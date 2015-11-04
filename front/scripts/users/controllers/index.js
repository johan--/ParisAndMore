'use strict';

module.exports = function(app) {
    // inject:start
    require('./room.controller')(app);
    require('./rooms.controller')(app);
    // inject:end
};