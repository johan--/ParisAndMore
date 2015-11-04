'use strict';

module.exports = function(app) {
    // inject:start
    require('./chat.service')(app);
    // inject:end
};