'use strict';

module.exports = function(app) {
    // inject:start
    require('./monservice.service')(app);
    // inject:end
};