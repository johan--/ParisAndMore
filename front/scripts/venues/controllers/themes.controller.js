'use strict';
var controllername = 'themes';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var deps = [app.name + '.VenuesService', '$state'];

    function controller(VenuesService, $state) {
        var vm = this;
        console.log(fullname);

        vm.getThemes = getThemes;
        vm.setVenuesCats = setVenuesCats;
        vm.setThemeObject = setThemeObject;
        activate();

        function activate() {
            vm.getThemes();
        }

        function setVenuesCats(categories) {
            VenuesService.setVenuesCats(categories.theme.categories);
        }

        function setThemeObject(categories) {
            VenuesService.setSelectedTheme(categories);
        }

        function getThemes() {
            vm.themes = VenuesService.getThemes();
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
