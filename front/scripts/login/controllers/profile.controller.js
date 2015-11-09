'use strict';
var controllername = 'profile';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$rootScope', 'main.login.RegistrationService', '$state', '$cordovaCamera', '$firebaseObject', 'main.common.FirebaseService', '$ionicPlatform'];

    function controller($scope, $rootScope, RegistrationService, $state, $cordovaCamera, $firebaseObject, FirebaseService, $ionicPlatform) {
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
            //Sert à rien pour l'instant ?
        }

        var takingPhoto = false;
        $scope.takePhoto = function(typeSource) {
            console.log('take photo ?');
           $ionicPlatform.ready(function() {
                if(takingPhoto) {
                    console.log('test');
                    takingPhoto = false;
                    return;
                }else {
                    console.log('no taking photo');
                    takingPhoto = true;
                }

                console.log('ready');

                if(typeSource == 'upload') {
                    var options = {
                        quality: 100,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        encodingType: Camera.EncodingType.JPEG,
                        targetHeight: 400,
                    };

                }else {
                    var options = {
                        quality: 100,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        encodingType: Camera.EncodingType.JPEG,
                        cameraDirection: Camera.Direction.BACK,
                        popoverOptions: CameraPopoverOptions,
                        targetHeight: 400,
                        saveToPhotoAlbum: false,
                        correctOrientation: true
                    };
                }

                $cordovaCamera.getPicture(options).then(function(imageData) {
                    console.log('ok');
                    var user = FirebaseService.getAuthDatas();
                    user.update({
                        'photo': 'data:image/jpg;base64,' + imageData
                    });
                }, function(err) {
                    console.log(err);
                    //alert('L\'opération semble être annulée');
                });
            });

        };

        function addInfo() {
            var test = fb.child('users/' + fbAuth.uid).on('value', function(snapshot) {
                console.log(snapshot.val());
            });
        }
        var id = 0;

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
