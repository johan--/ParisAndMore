'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['main.login.UsersService', '$rootScope', '$scope', '$ionicModal', 'Firebase', '$firebaseArray', 'main.common.firebaseConst', '$firebaseAuth'];

    function controller(UsersService, $rootScope, $scope, $ionicModal, Firebase, $firebaseArray, firebaseConst, $firebaseAuth) {
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
            UsersService.login(user);
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
