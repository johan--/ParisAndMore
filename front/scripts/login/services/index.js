'use strict';

module.exports = function(app) {
    // inject:start
    require('./users.service')(app);
    // inject:end
};