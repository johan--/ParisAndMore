'use strict';
var controllername = 'venues';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.VenuesService', '$stateParams'];

    function controller(VenuesService, $stateParams) {
        var vm = this;
        vm.controllername = fullname;

        vm.getVenues = getVenues;

        activate();

        function activate() {
            vm.getVenues();
        }

        function getVenues() {
            var categories = VenuesService.getVenuesCats();
            console.log(categories);

            VenuesService.getVenues({
                categoryId: categories
            }).then(function(result) {
                vm.venues = result.response.venues;
            });
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
