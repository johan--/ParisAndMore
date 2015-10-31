'use strict';
var controllername = 'venue';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.VenuesService', '$stateParams', '$ionicLoading'];

    function controller(VenuesService, $stateParams, $ionicLoading) {
        var vm = this;
        console.log($stateParams);
        var venueId = $stateParams.venueId;
        vm.controllername = fullname;
        vm.getVenue = getVenue;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'loading'
            });
            vm.getVenue();
        }

        function getVenue() {
            VenuesService.getVenue({
                venueId: venueId
            }).then(function(result) {
                console.log(result);
                vm.venue = result.response.venue;
                $ionicLoading.hide();
            });
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
