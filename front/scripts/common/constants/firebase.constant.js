'use strict';
var constantname = 'firebaseConst';

module.exports = function(app) {
    var args = {
        FBURL: '' // Replace with your Firebase root url
    };
    app.constant(app.name + '.' + constantname, args);
};
