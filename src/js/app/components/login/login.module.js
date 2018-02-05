(function () {
    "use strict";

    angular
        .module("login", [])
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("login", {
                url: "/auth/login",
                params: {
                    message: ""
                },
                controller: "LoginController",
                controllerAs: "vm",
                templateUrl: "components/login/views/login.view.html",
                title: "Log In"
            });
    }

})();
