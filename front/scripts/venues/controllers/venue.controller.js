'use strict';
var controllername = 'venue';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.VenuesService', '$stateParams', '$ionicLoading'];

    function controller(VenuesService, $stateParams, $ionicLoading) {
        var vm = this;
        //console.log($stateParams);
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
                vm.venue.ratingTab = [];
                vm.getRate(vm.venue.rating);
                vm.getDays(vm.venue.popular.timeframes);
                $ionicLoading.hide();

            });
        }

        function getDays(days) {
            vm.venue.days = [];
            var jours = [];
            vm.venue.monday = 0;
            vm.venue.currendDay = null;
            var k = 0, m =0;

            for(var i = 0; i < days.length; i++ ){
                if(days[i].days.indexOf("lun") > -1)
                   vm.venue.monday = i;
               if(days[i].days.indexOf("Aujourd'hui") > -1)
                   vm.venue.currendDay = i;
            }

            for(var j = 0; j < days.length ; j++){

                if(j < days.length - vm.venue.monday ){

                  jours.push({
                        days : days[vm.venue.monday + m].days,
                        horaire : days[vm.venue.monday + m].open[0].renderedTime
                    });
                    m++;
                    
                }else{
                   jours.push({
                        days : days[k].days,
                        horaire : days[k].open[0].renderedTime
                    });
                    k++;
                }

                jours[j].days = jours[j].days.replace("lun.", "Lundi ");
                jours[j].days = jours[j].days.replace("mar.", "Mardi ");
                jours[j].days = jours[j].days.replace("mer.", "Mercredi ");
                jours[j].days = jours[j].days.replace("jeu.", "Jeudi ");
                jours[j].days = jours[j].days.replace("ven.", "Vendredi ");
                jours[j].days = jours[j].days.replace("sam.", "Samedi ");
                jours[j].days = jours[j].days.replace("dim.", "Dimanche ");
                jours[j].days = jours[j].days.replace("–", "- ");
                
                jours[j].horaire = jours[j].horaire.replace("–", " - ");
                
               if(jours[j].horaire == 'Aucun')
                    jours[j].horaire = 'Fermé';
            }
            vm.venue.jour = jours;
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
