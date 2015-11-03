'use strict';
var constantname = 'firebaseConst';

module.exports = function(app) {
    var args = {
        FBURL: 'https://pwm.firebaseio.com/'
    };
    app.constant(app.name + '.' + constantname, args);
};
