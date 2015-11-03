'use strict';
var controllername = 'profile';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$rootScope', 'main.login.RegistrationService', '$state'];

    function controller($rootScope, RegistrationService, $state) {
        var vm = this;
        vm.controllername = fullname;

        activate();

        function activate() {
            if(!RegistrationService.isAuth()) {
                $state.go('app.home');
            }
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
