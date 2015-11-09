'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$rootScope', '$scope', 'main.login.RegistrationService', '$state', '$ionicHistory'];

    function controller($rootScope, $scope, RegistrationService, $state, $ionicHistory) {
        console.log($rootScope);
        var vm = this;
        vm.controllername = fullname;
        $scope.doLogin = doLogin;

        activate();

        function activate() {
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        }

        function doLogin(user) {
            RegistrationService.login(user).then(function() {
                $rootScope.isConnected = true;
                $state.go('app.profile');
            }, function(error) {
                RegistrationService.getError(error);
            });
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
