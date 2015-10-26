'use strict';
var controllername = 'themes';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var deps = [app.name + '.VenuesService'];

    function controller(VenuesService) {
        var vm = this;

        vm.getThemes = getThemes;

        activate();

        function activate() {
            vm.getThemes();
        }

        function getThemes() {
            vm.themes = VenuesService.getThemes();
            console.log(vm.themes);
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
