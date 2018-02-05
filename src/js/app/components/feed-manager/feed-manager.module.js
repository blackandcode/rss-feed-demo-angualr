(function () {
    "use strict";

    angular
        .module("app.FeedManager", [])
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("app.feed-manager", {
                url: "/feed-manager",
                parent: "app",
                views: {
                    content: {
                        controller: "FeedManagerController",
                        controllerAs: "vm",
                        templateUrl: "components/feed-manager/feed-manager.view.html"
                    }
                },
                title: "Feed manager",
                breadcrumb: [
                    {
                        name: "Feed manager",
                        state: "app.feed-manager"
                    }
                ]
            });
    }

})();
