'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.login.UsersService', '$ionicModal', '$state'];

    function controller($scope, UsersService, $ionicModal, $state) {
        var vm = this;
        vm.controllername = fullname;
        vm.modal = $ionicModal.fromTemplate(require('../../login/views/login.html'), {scope: $scope});
        vm.openModal = openModal;
        $scope.closeLogin = closeLogin;
        $scope.doLogin = doLogin;

        activate();

        function activate() {

        }

        function openModal() {
            vm.modal.show();
        }

        function closeLogin() {
            vm.modal.hide();
        }

        function doLogin(user) {
            UsersService.login(user).then(function() {
                vm.modal.hide();
                $state.go('app.profile');
            }, function(error) {
                UsersService.getError(error);
            });
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
