'use strict';

module.exports = function(app) {
    // inject:start
    require('./map-directive.directive')(app);
    // inject:end
};