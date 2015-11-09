'use strict';
var controllername = 'menu';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$rootScope', '$scope', '$ionicPopover', 'main.login.RegistrationService', 'main.common.firebaseConst'];

    function controller($rootScope, $scope, $ionicPopover, RegistrationService, firebaseConst) {
        var vm = this;
        vm.controllername = fullname;

        activate();

        function activate() {
            var ref = new Firebase(firebaseConst.FBURL);
            $rootScope.isConnected = (ref.getAuth()) ? true : false;

            $scope.popover = $ionicPopover.fromTemplate(require('../views/menupopover.html'), {
                scope: $scope,
            });

            $('body').delegate('.popover-backdrop', 'click', function() {
                $scope.popover.hide();
            });
        }

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
