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
            getAuthDatas: getAuthDatas
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

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
