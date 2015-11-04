'use strict';
var controllername = 'rooms';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.users.ChatService'];

    function controller($scope, ChatService) {
        var vm = this;
        vm.controllername = fullname;
        vm.getRooms = getRooms;
        vm.rooms = [];

        activate();

        function activate() {
            vm.getRooms();
        }

        function getRooms() {
            var rooms = ChatService.getRooms();
            rooms.$loaded(function(data) {
                vm.rooms = data;
            });
        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
