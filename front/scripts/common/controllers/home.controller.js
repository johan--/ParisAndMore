'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$ionicModal'];

    function controller($scope, $ionicModal) {
        var vm = this;
        vm.controllername = fullname;
        vm.modal = $ionicModal.fromTemplate(require('../../login/views/login.html'), {scope: $scope});
        vm.login = login;
        $scope.closeLogin = closeLogin;

        activate();

        function activate() {

        }

        function login() {
            vm.modal.show();
        }

        function closeLogin() {
            vm.modal.hide();
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
