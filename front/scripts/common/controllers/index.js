'use strict';

module.exports = function(app) {
    // inject:start
    require('./home.controller')(app);
    // inject:end
};