'use strict';
var controllername = 'profile';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$rootScope', 'main.login.RegistrationService', '$state', '$cordovaCamera', '$firebaseObject', 'main.common.FirebaseService'];

    function controller($scope, $rootScope, RegistrationService, $state, $cordovaCamera, $firebaseObject, FirebaseService) {
        var vm = this;
        vm.controllername = fullname;
        var fb = RegistrationService.getFirebaseReference();
        var fbAuth = fb.getAuth();
        vm.addInfo = addInfo;

        vm.userSync = $firebaseObject(fb.child('users/' + fbAuth.uid));
        vm.userSync.$bindTo($scope, 'user');


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
            document.addEventListener('deviceready', onDeviceReady, false);
            function onDeviceReady() {
                if(takingPhoto) {
                    takingPhoto = false;
                    return;
                }else {
                    takingPhoto = true;
                }

                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    cameraDirection: 1,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {
                    var user = FirebaseService.getAuthDatas();
                    user.update({
                        'photo': imageData
                    });
                }, function(err) {
                    // error
                });


                /* navigator.camera.getPicture(onSuccess, onFail, {
                    options
                });
                function onSuccess(imageData) {
                    alert('onSuccess');
                    var user = FirebaseService.getAuthDatas();
                    user.update({
                        'photo': imageData
                    });
                    console.log(user);
                    //imageData
                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
                */
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
