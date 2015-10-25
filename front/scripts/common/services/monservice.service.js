'use strict';
var servicename = 'monservice';

module.exports = function(app) {

    var dependencies = ['$resource'];

    function service($resource) {
        var add = function(a, b) {
            console.log($resource);
            return a + b;
        };

        return {
            add: add
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};