'use strict';

module.exports = function(app) {
    // inject:start
    require('./registration.service')(app);
    // inject:end
};
