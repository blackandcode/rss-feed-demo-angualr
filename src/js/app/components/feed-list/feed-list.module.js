(function () {
    "use strict";

    angular
        .module("app.FeedList", [])
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("app.feed-list", {
                url: "/feed-list/:id?url",
                parent: "app",
                views: {
                    content: {
                        controller: "FeedListController",
                        controllerAs: "vm",
                        templateUrl: "components/feed-list/feed-list.view.html"
                    }
								},
								params: {
									id: {
										squash: false
									},
									url: {
										squash: false
									},
									name: {
										squash: false
									}
								},
                title: "Feed List",
                breadcrumb: [
                    {
                        name: "Feed List",
                        state: "app.feed-list"
                    }
                ]
            });
    }

})();
