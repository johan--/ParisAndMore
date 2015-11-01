'use strict';
var servicename = 'UsersService';

module.exports = function(app) {

    var dependencies = ['$rootScope', 'Firebase', '$firebaseArray', 'main.common.firebaseConst', '$firebaseAuth', '$state', '$ionicLoading', '$cordovaToast'];

    function service($rootScope, Firebase, $firebaseArray, firebaseConst, $firebaseAuth, $state, $ionicLoading, $cordovaToast) {
        var ref = new Firebase(firebaseConst.FBURL);
        $rootScope.authObj = $firebaseAuth(ref);

        function Service() {}

        Service.prototype = {
            createUser: createUser,
            login: login
        };

        return new Service();

        function createUser(user) {
            $ionicLoading.show({
                template: 'Connexion...'
            });
            $rootScope.authObj.$createUser(user)
                .then(function(authData) {
                    return $rootScope.authObj.$authWithPassword({
                        email: user.email,
                        password: user.password
                    }).then(function() {
                        console.log('test');
                        var fbAuth = ref.getAuth();
                        var users = ref.child('users/' + fbAuth.uid);
                        users.set(user);
                        $ionicLoading.hide();
                        $state.go('app.profile');
                    }).catch(function(error) {
                        console.log(error);
                    });
                }, function(error) {
                    $ionicLoading.hide();
                    console.error(error);
                    $cordovaToast.showShortTop(error).then(function(success) {
                        // success
                    }, function(error) {
                        // error
                    });
                });
        }

        function login(user) {
            $rootScope.authObj.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function(authData) {
                console.log('identifié');
                $state.go('app.profile');
            }).catch(function(error) {
                console.log(error);
            });
        }

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
