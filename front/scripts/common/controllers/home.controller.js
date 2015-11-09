'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$rootScope', '$scope', 'main.login.RegistrationService', '$ionicModal', '$state', '$ionicHistory'];

    function controller($rootScope, $scope, RegistrationService, $ionicModal, $state, $ionicHistory) {
        console.log($rootScope);
        var vm = this;
        vm.controllername = fullname;
        vm.modal = $ionicModal.fromTemplate(require('../../login/views/login.html'), {scope: $scope});
        vm.openModal = openModal;
        $scope.closeLogin = closeLogin;
        $scope.doLogin = doLogin;

        activate();

        function activate() {
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        }

        function openModal() {
            vm.modal.show();
        }

        function closeLogin() {
            vm.modal.hide();
        }

        function doLogin(user) {
            RegistrationService.login(user).then(function() {
                vm.modal.hide();
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
