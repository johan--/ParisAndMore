'use strict';

module.exports = function(app) {
    // inject:start
    require('./home.controller')(app);
    require('./menu.controller')(app);
    // inject:end
};