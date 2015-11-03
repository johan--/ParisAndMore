'use strict';
var controllername = 'venue';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.VenuesService', '$stateParams', '$ionicLoading'];

    function controller(VenuesService, $stateParams, $ionicLoading) {
        var vm = this;
        console.log($stateParams);
        var venueId = $stateParams.venueId;
        vm.controllername = fullname;
        vm.getVenue = getVenue;
        vm.getRate = getRate;
        vm.takePicture = takePicture;
        activate();

        function activate() {
            $ionicLoading.show({
                template: 'loading'
            });
            vm.getVenue();
        }

        function getVenue() {
            VenuesService.getVenue({
                venueId: venueId
            }).then(function(result) {
                console.log(result);
                vm.venue = result.response.venue;
                vm.venue.ratingTab = [];
                vm.getRate(vm.venue.rating);
                $ionicLoading.hide();

            });
        }

        function takePicture() {
            console.log('ok');
          navigator.camera.getPicture(function(imageURI) {

            // imageURI is the URL of the image that we can use for
            // an <img> element or backgroundImage.

          }, function(err) {

            // Ruh-roh, something bad happened

          });
        }

        function getRate(rating){
            vm.venue.rating = Math.round(rating/2);
            for(var i = 0; i < vm.venue.rating; i++){
                 vm.venue.ratingTab.push(true);
            }
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
