'use strict';
var controllername = 'venue';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', app.name + '.VenuesService', '$stateParams', '$ionicLoading', 'main.common.FirebaseService', '$firebaseObject', '$firebaseArray', '$state'];

    function controller($scope, VenuesService, $stateParams, $ionicLoading, FirebaseService, $firebaseObject, $firebaseArray, $state) {
        var vm = this;
        var venueId = $stateParams.venueId;
        vm.controllername = fullname;
        console.log(vm.controllername);
        vm.getVenue = getVenue;
        vm.getRate = getRate;
        vm.getDays = getDays;
        vm.takePicture = takePicture;
        vm.like = like;
        vm.checkLike = checkLike;
        vm.getLikers = getLikers;
        vm.likers = [];
        vm.createRoom = createRoom;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'loading'
            });
            vm.getVenue();
            vm.checkLike(venueId);
            vm.getLikers();

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

        function checkLike(venueId) {
            var userReference = FirebaseService.getAuthDatas();
            var userLikes = userReference.child('venues/' + venueId);
            FirebaseService.getAuthDatas().child('venues').child(venueId).once('value', function(snapshot) {
                if(snapshot.val()) {
                    vm.isLiked = true;
                    console.log('il y a un putain de snapshot');
                } else {
                    vm.isLiked = false;
                    console.log("snapshot vaut null");
                }
                console.log(snapshot.val());
                console.log(vm.isLiked);
            });
        }

        function like(venue) {
            var userReference = FirebaseService.getAuthDatas();
            console.log(userReference);
            var userLikes = userReference.child('venues/' + venue.id);
            FirebaseService.getAuthDatas().child('venues').child(venue.id).once('value', function(snapshot) {
                if(snapshot.val()) {
                    vm.isLiked = false;
                    userLikes.remove();
                } else {
                    vm.isLiked = true;
                    userLikes.set({
                        name: venue.name
                    });
                }

                console.log('je clique et c est:');
                console.log(vm.isLiked);
            });
        }

        function getLikers() {
            var users = $firebaseArray(FirebaseService.getFirebaseReference().child('users'));
            users.$loaded(function(result) {
                angular.forEach(result, function(liker, key) {
                    console.log(liker.$id);
                    if(liker.venues) {
                        angular.forEach(liker.venues, function(value, key) {
                            if(key === venueId) {
                                vm.likers.push({
                                    id: liker.$id,
                                    name: liker.name
                                });
                            } else {
                            }
                        });
                    }
                });
            });
        }

        function createRoom(liker) {
            var user = $firebaseObject(FirebaseService.getAuthDatas());
            var rooms = $firebaseArray(FirebaseService.getFirebaseReference().child('rooms'));
            var userRooms = $firebaseArray(FirebaseService.getAuthDatas().child('rooms'));
            var partnerRooms = $firebaseArray(FirebaseService.getUser(liker.id).child('rooms'));
            rooms.$add({
                date: new Date().getTime()
            }).then(function(ref) {
                userRooms.$add({
                    id: ref.name(),
                    partnerName: liker.name
                });
                partnerRooms.$add({
                    id: ref.name(),
                    partnerName: user.name
                });
                $state.go('app.room', { roomId: ref.name()});

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
