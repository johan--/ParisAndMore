'use strict';
var controllername = 'menu';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$ionicPopover'];

    function controller($scope, $ionicPopover) {
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {

        };
        activate();

        $scope.popover = $ionicPopover.fromTemplate(require('../views/menupopover.html'), {
            scope: $scope,
        });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
