'use strict';
var controllername = 'hello';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    console.log(app.name);
    /*jshint validthis: true */

    var deps = [app.name + '.monservice'];

    function controller(monservice) {
        var vm = this;
        vm.controllername = fullname;
        vm.testservice = monservice.add(5, 6);
        console.log(monservice.add(5, 6));

        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
