'use strict';
var controllername = 'venues';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.VenuesService', '$ionicLoading'];

    function controller(VenuesService, $ionicLoading) {
        var vm = this;
        vm.controllername = fullname;

        vm.getVenues = getVenues;
        vm.setVenue = setVenue;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'loading'
            });
            vm.getVenues();
        }

        function getVenues() {
            var categories = VenuesService.getVenuesCats();

            VenuesService.getVenues({
                categoryId: categories
            }).then(function(result) {
                vm.venues = result.response.venues;
                $ionicLoading.hide();
            });
        }

        function setVenue(venue) {
            VenuesService.setVenue(venue.id);
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
