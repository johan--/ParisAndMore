'use strict';
var controllername = 'profile';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$rootScope', 'main.login.RegistrationService', '$state', '$cordovaCamera'];

    function controller($rootScope, RegistrationService, $state, $cordovaCamera) {
        var vm = this;
        vm.controllername = fullname;
        vm.upload = upload;

        activate();

        function activate() {
            if(!RegistrationService.isAuth()) {
                $state.go('app.home');
            }
        }

        function upload() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                targetWidth: 300,
                targetHeight: 300,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                console.log(imageData);
            }, function(error) {
                console.log(error);
            });
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
