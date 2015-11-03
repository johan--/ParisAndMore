'use strict';
var controllername = 'signup';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.RegistrationService', '$state'];

    function controller(RegistrationService, $state) {
        var vm = this;
        vm.controllername = fullname;
        vm.registerUser = registerUser;

        activate();

        function activate() {
            if(RegistrationService.isAuth()) {
                $state.go('app.home');
            }
        }

        function registerUser(user) {
            console.log(user);
            RegistrationService.createUser(user);
        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
