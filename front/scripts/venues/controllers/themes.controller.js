'use strict';
var controllername = 'themes';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var deps = [app.name + '.VenuesService', '$state'];

    function controller(VenuesService, $state) {
        //$state.go('venues', {urlParams: {some: 'thing'}});
        var vm = this;

        vm.getThemes = getThemes;
        vm.setVenuesCats = setVenuesCats;

        activate();

        function activate() {
            vm.getThemes();
        }

        function setVenuesCats(categories) {
            VenuesService.setVenuesCats(categories.theme.categories);
        }

        function getThemes() {
            vm.themes = VenuesService.getThemes();
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
