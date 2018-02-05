(function () {
    "use strict";

    angular
        .module("error", [])
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("error", {
                url: "/error",
                params: {
                    message: ""
                },
                controller: "ErrorController",
                controllerAs: "vm",
                templateUrl: "components/error/views/error.view.html",
                title: "Error"
            });
    }

})();
