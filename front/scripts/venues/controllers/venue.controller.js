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
        vm.getDays = getDays;
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
                vm.venue = result.response.venue;
                console.log(vm.venue);
                
                vm.venue.ratingTab = [];
                vm.getRate(vm.venue.rating);
                vm.getDays(vm.venue.popular.timeframes);
                $ionicLoading.hide();

            });
        }

        function getDays(days) {
            vm.venue.days = [];
            var jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

            if(days.length < 7)
                jours.push('Samedi & Dimanche');
            else
                jours.push('Samedi', 'Dimanche');

            for(var j = 0; j < days.length; j++ ){

                if( j == 0){
                    vm.venue.days.push({
                        name : jours[j],
                        horaire : days[days.length - 1].open[0].renderedTime
                    });
                }else{
                    vm.venue.days.push({
                        name : jours[j],
                        horaire : days[j - 1].open[0].renderedTime
                    });
                }

                if(vm.venue.days[j].horaire == 'Aucun')
                    vm.venue.days[j].horaire = 'Fermé';
            }
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
