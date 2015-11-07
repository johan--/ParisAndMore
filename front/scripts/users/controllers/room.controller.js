'use strict';
var controllername = 'room';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.users.ChatService', '$stateParams', 'main.common.FirebaseService', '$firebaseObject', '$firebaseArray', 'Firebase'];

    function controller($scope, ChatService, $stateParams, FirebaseService, $firebaseArray, $firebaseObject, Firebase) {
        var vm = this;
        vm.controllername = fullname;
        vm.getRoom = getRoom;
        vm.addMessage = addMessage;
        vm.getUser = getUser;
        console.log(new Date());
        activate();

        function activate() {
            vm.getRoom();
            vm.getUser();
        }

        function getUser() {
            FirebaseService.getAuthDatas().on('value', function(snapshot) {
                vm.user = snapshot.val();
            });
        }

        function getRoom() {
            vm.messages = ChatService.getRoom($stateParams.roomId);
        }

        function addMessage() {
            var timestamp = new Date().getTime();
            vm.messages.$add({
                date: timestamp,
                name: vm.user.name,
                message: vm.newMessage,
                age: vm.user.age,
                photo: vm.user.photo
            });
            vm.newMessage = '';
        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
