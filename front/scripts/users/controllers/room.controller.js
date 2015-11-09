'use strict';
var controllername = 'room';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.users.ChatService', '$stateParams', 'main.common.FirebaseService', '$firebaseObject', '$firebaseArray', 'Firebase', '$location', '$ionicScrollDelegate', '$ionicLoading'];

    function controller($scope, ChatService, $stateParams, FirebaseService, $firebaseArray, $firebaseObject, Firebase, $location, $ionicScrollDelegate, $ionicLoading) {
        var vm = this;
        vm.controllername = fullname;
        vm.getRoom = getRoom;
        vm.addMessage = addMessage;
        vm.getUser = getUser;
        activate();

        function activate() {
            $ionicLoading.show({
                template: 'Chargement'
            });
            vm.getRoom();
            vm.getUser();
        }

        function getUser() {
            FirebaseService.getAuthDatas().on('value', function(snapshot) {
                vm.user = snapshot.val();
                $ionicLoading.hide();
            });
        }

        function getRoom() {
            vm.messages = ChatService.getRoom($stateParams.roomId);
        };

        function addMessage() {
            if(vm.newMessage == '') {
                return;
            }
            var timestamp = new Date().getTime();
            vm.messages.$add({
                date: timestamp,
                name: vm.user.name,
                message: vm.newMessage,
                photo: vm.user.photo
            });
            vm.newMessage = '';
            setTimeout(function() {
                $('.wrap-message:last-child').addClass('active');
                $('.wrap-message').last().animate({
                    'opacity': 1,
                    'bottom': '0'
                }, 700);
            }, 0);
        }

        function scrollMe(anchor) {
            $location.hash(anchor);
            $ionicScrollDelegate.anchorScroll();
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
