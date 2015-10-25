'use strict';

module.exports = function(app) {
    // inject:start
    require('./hello.controller')(app);
    // inject:end
};