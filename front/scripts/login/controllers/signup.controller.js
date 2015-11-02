'use strict';
var controllername = 'signup';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.RegistrationService'];

    function controller(RegistrationService) {
        var vm = this;
        vm.controllername = fullname;
        vm.registerUser = registerUser;

        var activate = function() {

        };
        activate();

        function registerUser(user) {
            console.log(user);
            RegistrationService.createUser(user);
        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
