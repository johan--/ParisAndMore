'use strict';
var controllername = 'venue';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [];

    function controller() {
        var vm = this;
        vm.controllername = fullname;
        console.log(vm.controllername);

        activate();

        function activate() {

        }

        function getVenue() {

        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
