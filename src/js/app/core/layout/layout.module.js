(function () {
    "use strict";

    angular
        .module("app.core.layout", [])
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("app", {
                abstract: true,
                url: "/app",
                controller: "LayoutController",
                controllerAs: "vm",
                templateUrl: "core/layout/views/layout.view.html",
                title: "",
                resolve: {
                    loadUserInfo: function ($http, RouterService, app, $q) {
                        var deferred = $q.defer();
                        if (!app.userData) {
                            $http({
                                method: "GET",
                                url: RouterService.loginRoutes("getUserInfo")
                            }).then(
                                function (response) {
																	debugger;
                                    if (app.propertyExists(response, "data.status") && response.data.status) {
																		
                                        app.userData = response.data.data;
                                        deferred.resolve({status: true});
                                    } else {
                                        deferred.resolve({status: false});
                                    }
                                },
                                function (error) {
                                    deferred.resolve({status: false});
                                }
                            );
                        } else {
                            deferred.resolve({status: true});
                        }
                        return deferred.promise;
                    }
                }
            });
    }
})();
