'use strict';
var controllername = 'room';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.users.ChatService', '$stateParams', 'main.common.FirebaseService', '$firebaseArray', 'Firebase'];

    function controller($scope, ChatService, $stateParams, FirebaseService, $firebaseArray, Firebase) {
        var vm = this;
        vm.controllername = fullname;
        vm.getRoom = getRoom;
        vm.addMessage = addMessage;
        vm.getUserName = getUserName;

        activate();

        function activate() {
            vm.getRoom();
            vm.getUserName();
        }

        function getUserName() {
            FirebaseService.getAuthDatas().on('value', function(snapshot) {
                vm.userName = snapshot.val().name;
            });
        }

        function getRoom() {
            vm.messages = ChatService.getRoom($stateParams.roomId);
        }

        function addMessage() {
            vm.messages.$add({
                name: vm.userName,
                message: vm.newMessage
            });
            vm.newMessage = '';
        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
