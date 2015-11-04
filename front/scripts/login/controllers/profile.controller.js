'use strict';
var controllername = 'profile';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$rootScope', 'main.login.RegistrationService', '$state', '$cordovaCamera', '$firebaseObject'];

    function controller($scope, $rootScope, RegistrationService, $state, $cordovaCamera, $firebaseObject) {
        var vm = this;
        vm.controllername = fullname;
        var fb = RegistrationService.getFirebaseReference();
        var fbAuth = fb.getAuth();
        vm.addInfo = addInfo;

        var userSync = $firebaseObject(fb.child('users/' + fbAuth.uid));
        userSync.$bindTo($scope, 'user');

        //vm.upload = upload;

        activate();

        function activate() {
            // Check if auth
            /*if(fbAuth) {
                console.log(fbAuth);
                fb.child('users/' + fbAuth.uid).on('value', function(snapshot) {
                    console.log(snapshot.val());
                    $scope.user = snapshot.val();
                    console.log($scope.user);
                });*/

                //vm.userReference = $firebaseObject(fb.child('users/' + fbAuth.uid));

            /*} else {
                $state.go('app.home');
            }*/
        }

        $scope.takePhoto = function() {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                destinationType: 0
            });
           function onSuccess(imageData) {
                 alert('onSuccess');
                 console.log("data:image/jpeg;base64,"+imageData);
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        };

        function addInfo() {
            var test = fb.child('users/' + fbAuth.uid).on('value', function(snapshot) {
                console.log(snapshot.val());
            });
            /*vm.userReference.$add({
                email: vm.userReference.email,
                name: vm.userReference.name,
                password: vm.userReference.password,
                message: 'bonjour tout le monde',
                test: 'coucou'
            }, function() {
                console.log('info ajotuée');
            });*/
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
