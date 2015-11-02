'use strict';
var controllername = 'menu';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$rootScope', '$scope', '$ionicPopover', 'main.login.RegistrationService'];

    function controller($rootScope, $scope, $ionicPopover, RegistrationService) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {

        };
        activate();

        $scope.popover = $ionicPopover.fromTemplate(require('../views/menupopover.html'), {
            scope: $scope,
        });

        $scope.logOut = function() {
            console.log('logout');
            $rootScope.isAuth = false;
            RegistrationService.logOut();
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $rootScope.isAuth = RegistrationService.isAuth();

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
