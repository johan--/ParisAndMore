'use strict';
var controllername = 'profiles';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.login.RegistrationService', 'main.common.FirebaseService', '$firebaseObject', '$firebaseArray', '$ionicLoading'];

    function controller($scope, RegistrationService, FirebaseService, $firebaseObject, firebaseArray, $ionicLoading) {
        var vm = this;
        vm.controllername = fullname;
        var fb = RegistrationService.getFirebaseReference();
        
        vm.createRoom = createRoom;

        var activate = function() {
            $ionicLoading.show({
                template: 'Chargement'
            });
            vm.idUser = location.href.split('user=')[1];
            vm.user = $firebaseObject(fb.child('users/' + vm.idUser));
            $ionicLoading.hide();
        };
        activate();
    }
    function createRoom(liker) {
        console.log(liker);
        var user = $firebaseObject(FirebaseService.getAuthDatas());
        var rooms = $firebaseArray(FirebaseService.getFirebaseReference().child('rooms'));
        var userRooms = $firebaseArray(FirebaseService.getAuthDatas().child('rooms'));
        var partnerRooms = $firebaseArray(FirebaseService.getUser(liker.id).child('rooms'));
        rooms.$add({
            date: new Date().getTime()
        }).then(function(ref) {
            userRooms.$add({
                id: ref.name(),
                partnerName: liker.name
            });
            partnerRooms.$add({
                id: ref.name(),
                partnerName: user.name
            });
            $state.go('app.room', { roomId: ref.name()});

        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
