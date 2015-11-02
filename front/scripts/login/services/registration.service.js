'use strict';
var servicename = 'RegistrationService';

module.exports = function(app) {

    var dependencies = ['$rootScope', 'Firebase', '$firebaseArray', 'main.common.firebaseConst', '$firebaseAuth', '$state', '$ionicLoading', '$cordovaToast'];

    function service($rootScope, Firebase, $firebaseArray, firebaseConst, $firebaseAuth, $state, $ionicLoading, $cordovaToast) {
        var ref = new Firebase(firebaseConst.FBURL);
        $rootScope.authObj = $firebaseAuth(ref);
        $rootScope.isAuth = ref.getAuth();

        function Service() {}

        Service.prototype = {
            createUser: createUser,
            login: login,
            getError: getError,
            isAuth: isAuth,
            logOut: logOut
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
                    });
                }, function(error) {
                    $ionicLoading.hide();
                    getError(error);
                });
        }

        function login(user) {
            $ionicLoading.show({
                template: 'Vérification...'
            });
            return $rootScope.authObj.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function(authData) {
                $ionicLoading.hide();
            });
        }

        function getError(error) {
            switch (error.code) {
                case 'INVALID_EMAIL':
                    console.error('Adresse email invalide');
                    $ionicLoading.hide();
                    $cordovaToast.showShortTop('Adresse email invalide');
                break;
                case 'INVALID_PASSWORD':
                    console.error('Password invalide');
                    $ionicLoading.hide();
                    $cordovaToast.showShortTop('Password invalide');
                break;
                case 'INVALID_USER':
                    console.error('Ce compte utilisateur n\' existe pas.');
                    $ionicLoading.hide();
                    $cordovaToast.showShortTop('Ce compte utilisateur n\' existe pas.');
                break;
                case 'EMAIL_TAKEN':
                    console.error('Cette adresse email est déjà prise.');
                    $ionicLoading.hide();
                    $cordovaToast.showShortTop('Cette adresse email est déjà prise.');
                break;
                default:
                    console.log('Error logging user in:', error);
            }
        }

        function isAuth() {
            return (ref.getAuth()) ? true : false;
        }

        function logOut() {
            ref.unauth();
            $state.go('app.home');
        }

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
