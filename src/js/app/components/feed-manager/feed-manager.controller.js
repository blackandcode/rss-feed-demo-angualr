(function () {
    "use strict";

    angular
        .module("app.FeedManager")
        .controller("FeedManagerController", AdminController);

    AdminController.$inject = ["$scope", "app", "$state"];

    function AdminController($scope, app, $state) {

        if(app.userData.type.indexOf("Admin") === -1) {
            $state.go(app.defaultStanje(app.userData));
        }

        $scope.$emit("updateBreadcrumb");
        $scope.$on("$destroy", function () {
            $scope.$emit("updateBreadcrumb");
        });

        var vm = this;
        vm.sekcije = [
            {
                naziv: "Putno osiguranje",
                state: "app.admin.putnoOsiguranje",
                imaPravoPristupa: app.userData.type.indexOf("Admin") !== -1 && app.imaAdminSekciju("263")
            }
        ];
    }

})();
