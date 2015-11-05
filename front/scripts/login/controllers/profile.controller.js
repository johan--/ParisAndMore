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
        var takingPhoto = false;
        $scope.takePhoto = function() {
            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                if(takingPhoto){
                    takingPhoto = false;
                    return;
                }else
                    takingPhoto = true;

               alert(navigator.camera);
               var options = {
                  quality: 80,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: false,
                  correctOrientation: true,
                  encodingType: Camera.EncodingType.JPEG,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: false
                };
                navigator.camera.getPicture(onSuccess, onFail, {
                    options
                });
               function onSuccess(imageData) {
                     alert('onSuccess');
                     console.log(imageData);
                }

                function onFail(message) {
                    alert('Failed because: ' + message); 
                }
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
        var id = 0;

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
