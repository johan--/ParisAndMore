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
            getUsers: getUsers
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

        function getUsers(params) {
            console.log(FirebaseFactory.getUsers());
            FirebaseFactory.getUsers(params).$promise;
        }

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
