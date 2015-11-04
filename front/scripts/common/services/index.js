'use strict';

module.exports = function(app) {
    // inject:start
    require('./firebase.service')(app);
    // inject:end
};