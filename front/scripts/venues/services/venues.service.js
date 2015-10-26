'use strict';
var servicename = 'VenuesService';

module.exports = function(app) {

    var dependencies = [app.name + '.VenuesFactory'];

    function service(VenuesFactory) {
        function Service() {}

        Service.prototype = {
            getThemes: getThemes,
            getVenues: getVenues
        };

        return new Service();

        function getThemes() {
            var themes = [
                {
                    name: 'Culture',
                    image: null
                },
                {
                    name: 'La Journée',
                    image: null
                },
                {
                    name: 'La Nuit',
                    image: null
                }
            ];

            return themes;
        }

        function getVenues(params) {
            return venuesFactory.getVenues(params).$promise;
        }
    }

    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);

};
