(function () {
    "use strict";

    angular
        .module(
            "app",
            [
                "ui.router",
                "ngSanitize",
                "schemaForm",
                "ngStorage",
                "kendo.directives",
                "app.core",
                "app.components",
            ]
        )
        .config(config)
        .run(run);

    config.$inject = ["$stateProvider", "$urlRouterProvider", "$urlMatcherFactoryProvider", "$httpProvider"];
    run.$inject = ["$rootScope", "$http", "$state", "app", "RouterService", "$localStorage"];

    function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider) {

        $urlMatcherFactoryProvider.strictMode(false);

        // Rule that converts url to lower case
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path(),
                lowerCasePath = path.toLowerCase();

            // if path is not lower case then convert to lower case
            if (path !== lowerCasePath) {
                $location.replace().path(lowerCasePath);
            }
        });

        kendo.culture("sr-Latn-ME");

        $httpProvider.defaults.withCredentials = true;

        // Loading
        $httpProvider.interceptors.push(function ($q, $rootScope, $localStorage) {
            return {
                request: request,
                response: response,
                requestError: error,
                responseError: error
            };

            function request(config) {
                if (!config.silentLoad) {
                    $rootScope.$broadcast('show-loader');
                }
                if ($localStorage.token) {
                    config.headers['token'] = $localStorage.token;
                }
                return config || $q.when(config);
            }

            function response(response) {
                $rootScope.$broadcast('hide-loader');
                return response || $q.when(response);
            }

            function error(response) {
                $rootScope.$broadcast('hide-loader');
                return $q.reject(response);
            }
        });

        $urlRouterProvider.otherwise("/login");
    }

    function run($rootScope, $http, $state, app, RouterService, $localStorage) {
        $http.defaults.headers.common["Accept"] = "application/json";
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            $rootScope.title = "Test app | ";
            if (toState.title) {
                $rootScope.title += toState.title;
            }

            // redirect if logged or not
            if ($localStorage.token) {
                if (toState.name === "login" ) { // if user is logged in
                    event.preventDefault();
                    $state.go(app.defaultStanje(app.userData));
                }
            } else {
                // if user is NOT logged in
                if ((toState.name !== "login")) {
                    event.preventDefault();
                    $state.go("login");
                }
            }

        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            console.log(unfoundState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log(fromState);
            console.log(toState);
        });

    }

})();
