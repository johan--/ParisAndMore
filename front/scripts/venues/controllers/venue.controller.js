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
                console.log(vm.venues);
                vm.getRate(vm.venue.rating);
                vm.getDays(vm.venue.popular.timeframes);
                $ionicLoading.hide();

            });
        }

        function getDays(days) {
            vm.venue.days = [];
            var jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            var k = 0, l = 0, m = 0, twoDays = null;
            vm.venue.currentDay = new Date().getUTCDay();

            //Parcer le tableau afin de récuper les objets qui contiennet 2 jour ex: 'lundi. -mar' et les séparer
            for(var i = 0; i < jours.length-1; i++ ){
                
                if(days[i].days && days[i].days.indexOf("–") > -1)
                    //Vérifier s'il y a un un objet qui contien 2 jours
                    twoDays = i;
                if(twoDays != null){
                    if(m > jours.length - twoDays){
                        //réporter des valeurs des index i à i +1 (on décale les valeurs)
                        days.push({
                            days : days[jours.length - m].days,
                            horaire: days[jours.length - m].open[0].renderedTime
                        });
                        m++;
                    }else{
                        //Une fois décalé, on duplique les valeurs de l'objet qui contient 2 jours
                        if(days[twoDays+1]){
                            days[twoDays+1].days = days[twoDays].days;
                            days[twoDays+1].horaire = days[twoDays].open[0].renderedTime;
                        }else{
                            days.push({
                                days : days[twoDays].days,
                                horaire: days[twoDays].open[0].renderedTime
                            });
                        }

                        m = 0, twoDays = null;
                    }
                }
                days[i].days = days[i].days;
                days[i].horaire = days[i].open[0].renderedTime;
            }
            
            //Parcer les heures d'ouvertures et les jours afin de synchroniser les deux sur la même ligne
            for(var j = 0; j < jours.length ; j++ ){
                
                if(k < jours.length - vm.venue.currentDay){
                    //Afficher les heures des jours AVANT le currentDay (aujourd'hui)

                    vm.venue.days.push({
                        days : jours[j],
                        horaire : days[k].horaire
                    });
                    k++;

                }else{
                    //Afficher les heures des jours APRES le currentDay (aujourd'hui)
                    l++;
                    vm.venue.days.push({
                        days : jours[j],
                        horaire : days[l].open[0].renderedTime
                    });
                }

                //Afficher fermé lorsque qu'un objet heure vaut 'Aucun' & remplace le curentDay par Aujourd'hui
                if(vm.venue.days[j].horaire == 'Aucun')
                    vm.venue.days[j].horaire = 'Fermé';
                if(vm.venue.currentDay -1 == j)
                   vm.venue.days[j].days = "Aujourd'hui";
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
