'use strict';
var controllername = 'signup';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.UsersService'];

    function controller(UsersService) {
        var vm = this;
        vm.controllername = fullname;
        vm.registerUser = registerUser;

        var activate = function() {

        };
        activate();

        function registerUser(user) {
            console.log(user);
            UsersService.createUser(user);
        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
