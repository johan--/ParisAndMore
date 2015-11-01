'use strict';

module.exports = function(app) {
    // inject:start
    require('./profile.controller')(app);
    require('./signup.controller')(app);
    // inject:end
};