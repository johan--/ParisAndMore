'use strict';
var servicename = 'ChatService';

module.exports = function(app) {

    var dependencies = ['main.common.FirebaseService', '$firebaseArray', '$firebaseObject'];

    function service(FirebaseService, $firebaseArray, $firebaseObject) {
        var firebaseReference = FirebaseService.getFirebaseReference();
        var auth = FirebaseService.getAuthUid();

        function Service() {}

        Service.prototype = {
            getRooms: getRooms,
            getRoom: getRoom,
            getPartnerName: getPartnerName
        };

        return new Service();

        function getRooms() {
            return $firebaseArray(firebaseReference.child('users/' + auth + '/rooms'));
        }

        function getRoom(roomId) {
            return $firebaseArray(firebaseReference.child('rooms/' + roomId + '/messages'));
        }

        function getPartnerName(uid) {
            return firebaseReference.child('users/' + uid + '/name');
        }

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
