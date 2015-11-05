'use strict';
var servicename = 'FirebaseService';

module.exports = function(app) {

    var dependencies = ['Firebase', 'main.common.firebaseConst'];

    function service(Firebase, firebaseConst) {
        var firebaseReference = new Firebase(firebaseConst.FBURL);

        function Service() {}

        Service.prototype = {
            getFirebaseReference: getFirebaseReference,
            getAuthUid: getAuthUid,
            getAuthDatas: getAuthDatas,
            getUser: getUser
        };

        return new Service();

        function getFirebaseReference() {
            return firebaseReference;
        }

        function getAuthUid() {
            return firebaseReference.getAuth().uid;
        }

        function getAuthDatas() {
            return firebaseReference.child('users/' + firebaseReference.getAuth().uid);
        }

        function getUser(uid) {
            return firebaseReference.child('users/' + uid);
        }

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
