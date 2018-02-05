(function () {
    "use strict";

    angular
        .module("app.core.services")
        .factory("RouterService", RouterService);

    function RouterService() {

        function getAPIUrl(url) {
            if (!url) {
                url = "";
            }

            if (url[0] === "/") {
                url = url.substr(1); // remove slash if it is present
            }

            var currentUrl = window.location;
            var apiUrl = "http://testera.netcoredev.bildhosting.me/api/services/app/"; // Dev domain

            // if (currentUrl.host === "agent.uniqa.me") {
                apiUrl = "http://insurance-calculators-rest.uniqa.me/api/services/app/"; // Production domain
            // }

            return apiUrl + url;
        }

        function apiRoutes(key) {
            var routes = {
                ListaAgenata:               "User/ListaAgenata"
            };

            return getAPIUrl(routes[key]);
        }

        function getLoginUrl(url) {
            if (!url) {
                url = "";
            }

            if (url[0] === "/") {
                url = url.substr(1); // remove slash if it is present
            }

            var currentUrl = window.location;
            var apiUrl = "http://webshop-api-uniqa.local.bildhosting.me/index.php/"; // Dev domain

            // if (currentUrl.host === "agent.uniqa.me") {
                apiUrl = "http://webshop-admin.uniqa.me/index.php/"; // Production domain
            // }

            return apiUrl + url;
        }

        function loginRoutes(key) {
            var routes = {
                login:          "uniqaAgents/login",
                getUserInfo:    "uniqaAgents/getUserInfo",
                logout:         "uniqaAgents/logout"
            };

            return getLoginUrl(routes[key]);
        }

        function localRoutes(key) {
            var routes = {
                empty: ""
            };

            return routes[key];
        }

        function serverRoute() {
            var currentUrl = window.location;
            var apiUrl = "http://testera.netcoredev.bildhosting.me/"; // Dev domain

            // if (currentUrl.host === "agent.uniqa.me") {
                apiUrl = "http://insurance-calculators-rest.uniqa.me/"; // Production domain
            // }

            return apiUrl;
        }

        return {
            getAPIUrl: getAPIUrl,
            apiRoutes: apiRoutes,
            loginRoutes: loginRoutes,
            localRoutes: localRoutes,
            serverRoute: serverRoute()
        };
    }

})();
