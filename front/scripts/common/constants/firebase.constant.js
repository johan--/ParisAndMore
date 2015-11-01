'use strict';
var constantname = 'firebaseConst';

module.exports = function(app) {
    var args = {
        FBURL: 'https://blinding-torch-6802.firebaseio.com'
    };
    app.constant(app.name + '.' + constantname, args);
};
